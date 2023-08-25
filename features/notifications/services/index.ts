import { doc, getDocs, query, setDoc, where } from "firebase/firestore";
import {
  notificationsCollection,
  userNotificationsCollection,
} from "@/services/firebase";
import {
  setAddNewNotification,
  setArchiveNotification,
  setNotifications,
  setUnarchiveNotification,
} from "../slice";
import {
  setUpdateUser,
  updateUser,
  type User,
} from "@/features/authentication";
import { api } from "@/services/api";
import { formatISO } from "date-fns";
import type { Notification, NotificationsGroup } from "../types";

export const notificationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchNotifications: build.query<NotificationsGroup, unknown>({
      async queryFn({ user }: { user: User }, { dispatch }) {
        console.log("Executing: fetchNotifications");
        try {
          let data: NotificationsGroup = {};
          const collRef = notificationsCollection;
          // fetch all notifications created after the user was created
          const q = query(collRef, where("isVisible", "==", true));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((notification: any) => {
            data[notification.id] = notification.data();
          });

          // fetch all user notifications
          const userCollRef = userNotificationsCollection(user.id);
          const userQuerySnapshot = await getDocs(userCollRef);
          userQuerySnapshot.forEach((notification: any) => {
            const notificationData = notification.data() as Notification;
            data[notification.id] = {
              ...notificationData,
            };
          });

          console.log({ data });
          const archivedIds = user.notificationsArchived || [];
          dispatch(setNotifications({ notifications: data, archivedIds }));
          return { data: data };
        } catch (error) {
          console.log({ error });
          return { error: error };
        }
      },
      providesTags: ["notifications"],
    }),
    archiveNotification: build.mutation<User, unknown>({
      async queryFn(
        { user, notificationID }: { user: User; notificationID: string },
        { dispatch }
      ) {
        console.log("Executing: archiveNotification");
        try {
          const notificationsArchived = [
            ...user.notificationsArchived,
            notificationID,
          ];
          const res = await updateUser({
            user,
            fields: { notificationsArchived },
          });
          if (res.result === "error") throw new Error("Error updating user");
          dispatch(setArchiveNotification({ id: notificationID }));
          dispatch(
            setUpdateUser({
              user,
              fields: {
                notificationsArchived,
              },
            })
          );
          return { data: res.data };
        } catch (error) {
          console.log({ error });
          return { error };
        }
      },
      invalidatesTags: ["notifications"],
    }),
    unarchiveNotification: build.mutation<User, unknown>({
      async queryFn(
        { user, notificationID }: { user: User; notificationID: string },
        { dispatch }
      ) {
        console.log("Executing: unarchiveNotification");
        try {
          const notificationsArchived = user.notificationsArchived.filter(
            (id) => id !== notificationID
          );
          console.log({ notificationsArchived });

          // There should be an updateUser mutation and therefore no need to dispatch
          const res = await updateUser({
            user,
            fields: { notificationsArchived },
          });
          if (res.result === "error") throw new Error("Error updating user");
          dispatch(setUnarchiveNotification({ id: notificationID }));
          dispatch(
            setUpdateUser({
              user,
              fields: { notificationsArchived },
            })
          );
          return { data: res.data };
        } catch (error) {
          console.log({ error });
          return { error };
        }
      },
      invalidatesTags: ["notifications"],
    }),
    createNotification: build.mutation<Notification, unknown>({
      async queryFn(
        { user, notification }: { user: User; notification: Notification },
        { dispatch }
      ) {
        console.log("Executing: createNotification");
        try {
          const isoDate = formatISO(new Date());
          const docRef = doc(userNotificationsCollection(user.id));
          const newDoc: Notification = {
            ...notification,
            id: docRef.id,
            dateCreated: isoDate,
          };
          await setDoc(docRef, newDoc);

          dispatch(setAddNewNotification({ notification: newDoc }));

          return { data: notification };
        } catch (error) {
          console.log({ error });
          return { error };
        }
      },
      invalidatesTags: ["notifications"],
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useArchiveNotificationMutation,
  useCreateNotificationMutation,
  useFetchNotificationsQuery,
  useUnarchiveNotificationMutation,
} = notificationsApi;
