import { db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { newAccount } from "@/utils/initialTypes";
import { User, deleteUser } from "firebase/auth";
import { UserAccount } from "@/types/types";

const createNewUser = async (user: User) => {
  try {
    const newUserRef = doc(db, "users", user.uid);
    const newUser: UserAccount = {
      ...newAccount,
      created_at: user.metadata.creationTime,
      display_name: user.displayName || "",
      email_address: user.email,
      photo_url: user.photoURL,
      user_id: user.uid,
      premium_plan: "free",
    };
    await setDoc(newUserRef, newUser);
  } catch (error) {
    await deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
    return { error: error };
  }
};

const generateUserObject = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    console.log('getDoc: doc(db, "users", user.uid)');
    const querySnapshot = await getDoc(userRef);
    const userData = querySnapshot.data();
    if (userData) {
      // If I need to add something else from the User (google) object, I can add it here.
      const userAccount: UserAccount = {
        body_data: userData.body_data,
        created_at: userData.created_at,
        display_name: userData.display_name,
        email_address: userData.email_address,
        first_data: userData.first_data,
        food_data: userData.food_data,
        is_premium: userData.is_premium,
        is_profile_completed: userData.is_profile_completed,
        lang: userData.lang,
        photo_url: userData.photo_url,
        plan_selected: userData.plan_selected,
        premium_plan: userData.premium_plan,
        user_id: userData.user_id,
        weight_goal: userData.weight_goal,
      };
      return userAccount || null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUser = async (user: UserAccount) => {
  try {
    const userRef = doc(db, "users", user.user_id);
    console.log('setDoc: doc(db, "users", user.uid)');
    await setDoc(userRef, user);
  } catch (error) {
    return { error: error };
  }
};

export { createNewUser, generateUserObject, updateUser };
