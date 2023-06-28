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
    const newUserRef = doc(db, "users", user.uid);
    const newUser: UserAccount = {
      ...newAccount,
      created_at: user.metadata.creationTime,
      display_name: user.displayName || "",
      email_address: user.email,
      photo_url: user.photoURL,
      user_id: user.uid,
    };
    await setDoc(newUserRef, newUser);
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
    const userAccount: UserAccount = {
      body_data: userData.body_data,
      created_at: userData.created_at,
      display_name: userData.display_name,
      email_address: userData.email_address,
      first_data: userData.first_data,
      goal: userData.goal,
      is_admin: userData.is_admin,
      is_premium: userData.is_premium,
      is_profile_completed: userData.is_profile_completed,
      lang: userData.lang,
      measurement_unit: userData.measurement_unit,
      nutrition_targets: userData.nutrition_targets,
      photo_url: userData.photo_url,
      plan_selected: userData.plan_selected,
      premium_plan: userData.premium_plan,
      ratings: userData.ratings,
      startOfWeek: userData.startOfWeek,
      user_id: userData.user_id,
      user_step: userData.user_step,
      weight_goal: userData.weight_goal,
    };
    return { result: "success", data: userAccount };
  } catch (error) {
    console.log(error);
    return { result: "error", error };
  }
};

const updateUser = async (
  user: UserAccount
): Promise<Result<UserAccount, unknown>> => {
  try {
    const userRef = doc(db, "users", user.user_id);
    await setDoc(userRef, user);
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
    const userRef = doc(db, "users", user.user_id);
    await updateDoc(userRef, {
      plan_selected: planID,
    });
    return { result: "success", data: true };
  } catch (error) {
    return { result: "error", error };
  }
};

export { createNewUser, generateUserObject, updateUser, updateUserPlan };
