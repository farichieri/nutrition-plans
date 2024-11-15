import {
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  notificationsCollection,
  userDocRef,
  userNotificationsCollection,
} from "@/services/firebase";
import {
  setAddNewNotification,
  setArchiveAllNotifications,
  setArchiveNotification,
  setNotifications,
  setUnarchiveNotification,
} from "../slice";
import { setUpdateUser, type User } from "@/features/authentication";
import { api } from "@/services/api";
import { formatISO } from "date-fns";
import type { Notification, NotificationsGroup } from "../types";

export const notificationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<NotificationsGroup, { user: User }>({
      async queryFn({ user }, { dispatch }) {
        console.log("Executing: getNotifications");
        try {
          let data: NotificationsGroup = {};

          const promises = Promise.all([
            getDocs(
              query(notificationsCollection, where("isVisible", "==", true))
            ),
            getDocs(userNotificationsCollection(user.id)),
          ]);
          const [querySnapshot, userQuerySnapshot] = await promises;
          querySnapshot.forEach((notification: any) => {
            data[notification.id] = notification.data();
          });
          userQuerySnapshot.forEach((notification: any) => {
            const notificationData = notification.data() as Notification;
            data[notification.id] = {
              ...notificationData,
            };
          });

          const archivedIds = user.notificationsArchived || [];
          dispatch(setNotifications({ notifications: data, archivedIds }));
          return { data: data };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      providesTags: ["notifications"],
    }),

    archiveNotification: build.mutation<
      User,
      { user: User; notificationID: string }
    >({
      async queryFn({ user, notificationID }, { dispatch }) {
        console.log("Executing: archiveNotification");
        try {
          const notificationsArchived = [
            ...user.notificationsArchived,
            notificationID,
          ];

          const userRef = userDocRef({ userID: user.id });
          await updateDoc(userRef, { notificationsArchived });

          dispatch(setArchiveNotification({ id: notificationID }));
          dispatch(
            setUpdateUser({
              user,
              fields: {
                notificationsArchived,
              },
            })
          );
          return { data: user };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
      invalidatesTags: ["notifications"],
    }),

    archiveAllNotifications: build.mutation<
      User,
      { user: User; notificationIDS: string[] }
    >({
      async queryFn({ user, notificationIDS }, { dispatch }) {
        console.log("Executing: archiveAllNotifications");
        try {
          const newArchived = [
            ...user.notificationsArchived,
            ...notificationIDS,
          ];

          const userRef = userDocRef({ userID: user.id });
          await updateDoc(userRef, {
            fields: { notificationsArchived: newArchived },
          });

          dispatch(setArchiveAllNotifications());
          dispatch(
            setUpdateUser({
              user,
              fields: {
                notificationsArchived: newArchived,
              },
            })
          );
          return { data: user };
        } catch (error) {
          console.error(error);
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

          const userRef = userDocRef({ userID: user.id });
          await updateDoc(userRef, { fields: { notificationsArchived } });

          dispatch(setUnarchiveNotification({ id: notificationID }));
          dispatch(
            setUpdateUser({
              user,
              fields: { notificationsArchived },
            })
          );
          return { data: user };
        } catch (error) {
          console.error(error);
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
          console.error(error);
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
  useGetNotificationsQuery,
  useUnarchiveNotificationMutation,
  useArchiveAllNotificationsMutation,
} = notificationsApi;
