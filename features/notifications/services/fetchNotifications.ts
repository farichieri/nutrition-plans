import { getDocs, query, where } from "firebase/firestore";
import { notificationsCollection } from "@/services/firebase/firebase.config";
import { Result } from "@/types";
import { User } from "@/features/authentication";
import { NotificationsGroup } from "../types";

const fetchNotifications = async ({
  user,
}: {
  user: User;
}): Promise<Result<NotificationsGroup, unknown>> => {
  console.log(`Fetching fetchNotifications`);
  try {
    let data: NotificationsGroup = {};
    const collRef = notificationsCollection;
    const date = new Date(user.createdAt!);
    // fetch all notifications created after the user was created
    const q = query(collRef, where("dateCreated", ">", date));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((notification: any) => {
      data[notification.id] = notification.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching fetchNotifications: ${error}` });
    return { result: "error", error };
  }
};

export default fetchNotifications;
