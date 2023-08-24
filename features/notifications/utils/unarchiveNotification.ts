import { User, updateUser } from "@/features/authentication";
import { Result } from "@/types";

const unarchiveNotification = async ({
  user,
  notificationID,
}: {
  user: User;
  notificationID: string;
}): Promise<Result<User, unknown>> => {
  try {
    const notificationsArchived = user.notificationsArchived.filter(
      (id) => id !== notificationID
    );
    console.log({ notificationsArchived });
    const res = await updateUser({ user, fields: { notificationsArchived } });
    if (res.result === "error") throw new Error("Error updating user");
    return { result: "success", data: res.data };
  } catch (error) {
    return { result: "error", error };
  }
};

export default unarchiveNotification;
