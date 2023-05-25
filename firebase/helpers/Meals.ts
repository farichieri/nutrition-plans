import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { User } from "firebase/auth";
import { UserAccount } from "@/types/types";
import { UserMeal, UserMeals } from "@/types/mealsSettingsTypes";

const fetchMeals = async (user: User) => {
  console.log("Fetching Meals");
  try {
    let data: UserMeals = {};
    const userMealsRef = query(collection(db, "users", user.uid, "meals"));
    const querySnapshot = await getDocs(userMealsRef);
    querySnapshot.forEach((meal: any) => {
      data[meal.id] = meal.data();
    });
    return data;
  } catch (error) {
    console.log("fetchMeals", { error });
    return {};
  }
};

const fetchMealsSettings = async (user: User) => {
  console.log("Fetching MealsSettings");
  try {
    let data: UserMeals = {};
    const userMealsSettingsRef = query(
      collection(db, "users", user.uid, "settings", "mealsSettings", "meals")
    );
    const querySnapshot = await getDocs(userMealsSettingsRef);
    querySnapshot.forEach((meal: any) => {
      data[meal.id] = meal.data();
    });
    return data;
  } catch (error) {
    console.log("fetchMealsSettings", { error });
    return {};
  }
};

const createMealSetting = async (user: UserAccount, mealSetting: UserMeal) => {
  try {
    const newMealSettingRef = doc(
      collection(
        db,
        "users",
        user.user_id,
        "settings",
        "mealsSettings",
        "meals"
      )
    );
    const newMealSetting = {
      ...mealSetting,
      id: newMealSettingRef.id,
    };
    await setDoc(newMealSettingRef, newMealSetting);
    return { mealSettingAdded: newMealSetting };
  } catch (error) {
    console.log("createMealSetting", { error });
    return { error: error };
  }
};

const createUserMeal = async (user: UserAccount, mealSetting: UserMeal) => {
  try {
    const newUserMeal = doc(collection(db, "users", user.user_id, "meals"));
    const newMealSetting = {
      ...mealSetting,
      id: newUserMeal.id,
    };
    await setDoc(newUserMeal, newMealSetting);
    return { mealSettingAdded: newMealSetting };
  } catch (error) {
    console.log("createUserMeal", { error });
    return { error: error };
  }
};

const deleteUserMeal = async (user: UserAccount, mealSetting: UserMeal) => {
  try {
    if (!mealSetting.id) throw Error;
    const docRef = doc(db, "users", user.user_id, "meals", mealSetting.id);
    await deleteDoc(docRef);
    return { res: "success" };
  } catch (error) {
    console.log("deleteUserMeal", { error });
    return { error: error };
  }
};

const deleteMealSetting = async (user: UserAccount, mealSetting: UserMeal) => {
  try {
    if (!mealSetting.id) throw Error;
    const docRef = doc(
      db,
      "users",
      user.user_id,
      "settings",
      "mealsSettings",
      "meals",
      mealSetting.id
    );
    await deleteDoc(docRef);
    return { res: "success" };
  } catch (error) {
    console.log("deleteMealSetting", { error });
    return { error: error };
  }
};

const updateUserMeal = async (user: UserAccount, userMeal: UserMeal) => {
  try {
    if (!userMeal.id) throw Error;
    const docRef = doc(db, "users", user?.user_id, "meals", userMeal.id);
    await setDoc(docRef, userMeal);
    return {};
  } catch (error) {
    console.log("updateUserMeal", { error });
    return { error: error };
  }
};

export {
  createMealSetting,
  createUserMeal,
  deleteMealSetting,
  deleteUserMeal,
  fetchMeals,
  fetchMealsSettings,
  updateUserMeal,
};
