import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { PlansEnum, Result } from "@/types";
import { User, deleteUser } from "firebase/auth";
import { UserAccount, newAccount } from "@/features/authentication";
import { db } from "@/services/firebase/firebase.config";

const createNewUser = async (
  user: User
): Promise<Result<UserAccount, unknown>> => {
  try {
    console.log("createNewUser");
    const { uid, email, photoURL, displayName, metadata } = user;
    const newUserRef = doc(db, "users", uid);
    const newUser: UserAccount = {
      ...newAccount,
      createdAt: metadata.creationTime,
      displayName: displayName || "",
      emailAddress: email,
      imageURL: photoURL,
      id: uid,
    };
    await setDoc(newUserRef, newUser);
    await fetch("/api/welcome/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailAddress: email }),
    });
    return { result: "success", data: newUser };
  } catch (error) {
    try {
      await deleteUser(user);
      console.log("User deleted");
    } catch (error) {
      console.log("Error deleting user");
    }
    return { result: "error", error };
  }
};

const generateUserObject = async (
  user: User
): Promise<Result<UserAccount, unknown>> => {
  try {
    console.log("generateUserObject");
    const userRef = doc(db, "users", user.uid);
    const querySnapshot = await getDoc(userRef);
    const userData = querySnapshot.data();
    if (!userData) throw new Error("Error fetching user Data");
    const userAccount: UserAccount = userData as UserAccount;
    return { result: "success", data: userAccount };
  } catch (error) {
    console.log(error);
    return { result: "error", error };
  }
};

const updateUser = async ({
  user,
  fields,
}: {
  user: UserAccount;
  fields: Partial<UserAccount>;
}): Promise<Result<UserAccount, unknown>> => {
  try {
    console.log({ user });
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, fields);
    return { result: "success", data: user };
  } catch (error) {
    console.log("updateUser", { error });
    return { result: "error", error };
  }
};

const updateUserPlan = async (
  planID: PlansEnum,
  user: UserAccount
): Promise<Result<boolean, unknown>> => {
  try {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      plan_selected: planID,
    });
    return { result: "success", data: true };
  } catch (error) {
    return { result: "error", error };
  }
};

export { createNewUser, generateUserObject, updateUser, updateUserPlan };
