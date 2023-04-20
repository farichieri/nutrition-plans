import { db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, deleteUser } from "firebase/auth";
import { UserAccount } from "@/types/types";

const createNewUser = async (user: User) => {
  try {
    const newUserRef = doc(db, "users", user.uid);
    const newUser: UserAccount = {
      activity: null,
      age: null,
      BMI: null,
      BMR: null,
      created_at: user.metadata.creationTime,
      display_name: user.displayName || "",
      email_address: user.email,
      food_preferences: [],
      gender: null,
      goal: null,
      height_in_cm: null,
      is_premium: false,
      is_profile_completed: false,
      kcals_recommended: null,
      lang: "en",
      measurement_unit: null,
      photo_url: user.photoURL,
      plan_selected: null,
      premium_plan: "free",
      user_id: user.uid,
      weight_goal_in_kg: null,
      weight_in_kg: null,
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
        activity: userData.activity,
        age: userData.age,
        BMI: userData.BMI,
        BMR: userData.BMR,
        created_at: userData.created_at,
        display_name: userData.display_name,
        email_address: userData.email_address,
        food_preferences: userData.food_preferences,
        gender: userData.gender,
        goal: userData.goal,
        height_in_cm: userData.height_in_cm,
        is_premium: userData.is_premium,
        is_profile_completed: userData.is_profile_completed,
        kcals_recommended: userData.kcals_recommended,
        lang: userData.lang,
        measurement_unit: userData.measurement_unit,
        photo_url: userData.photo_url,
        plan_selected: userData.plan_selected,
        premium_plan: userData.premium_plan,
        user_id: userData.user_id,
        weight_goal_in_kg: userData.weight_goal_in_kg,
        weight_in_kg: userData.weight_in_kg,
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
