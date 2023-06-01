import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import {
  MealComplexities,
  MealsSettings,
  UserMeal,
  UserMeals,
  MealMinutes,
  UserMealsArr,
  MealSizes,
} from "@/features/meals/types";
import { db } from "../../../services/firebase/firebase.config";
import { Result } from "@/types";
import { UserAccount } from "@/features/authentication";

const fetchMeals = async (
  userID: string
): Promise<Result<UserMeals, unknown>> => {
  console.log("Fetching Meals");
  try {
    let data: UserMeals = {};
    const userMealsRef = query(collection(db, "users", userID, "meals"));
    const querySnapshot = await getDocs(userMealsRef);
    querySnapshot.forEach((meal: any) => {
      data[meal.id] = meal.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log("fetchMeals", { error });
    return { result: "error", error };
  }
};

const fetchMealsSettings = async (
  userID: string
): Promise<Result<UserMeals, unknown>> => {
  console.log("Fetching MealsSettings");
  try {
    let data: MealsSettings = {};
    const userMealsSettingsRef = query(
      collection(db, "users", userID, "settings", "mealsSettings", "meals")
    );
    const querySnapshot = await getDocs(userMealsSettingsRef);
    querySnapshot.forEach((meal: any) => {
      data[meal.id] = meal.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log("fetchMealsSettings", { error });
    return { result: "error", error };
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

const updateMealSetting = async (
  user: UserAccount,
  mealSetting: UserMeal
): Promise<Result<UserMeal, unknown>> => {
  try {
    if (!mealSetting.id) throw Error;
    const mealSettingRef = doc(
      db,
      "users",
      user.user_id,
      "settings",
      "mealsSettings",
      "meals",
      mealSetting.id
    );
    await setDoc(mealSettingRef, mealSetting);
    return { result: "success", data: mealSetting };
  } catch (error) {
    console.log("createMealSetting", { error });
    return { result: "error", error };
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

const deleteUserMeal = async (
  user: UserAccount,
  mealSetting: UserMeal
): Promise<Result<UserMeal, unknown>> => {
  try {
    if (!mealSetting.id) throw Error;
    const docRef = doc(db, "users", user.user_id, "meals", mealSetting.id);
    await deleteDoc(docRef);
    return { result: "success", data: mealSetting };
  } catch (error) {
    console.log("deleteUserMeal", { error });
    return { result: "error", error };
  }
};

const deleteMealSetting = async (
  user: UserAccount,
  mealSetting: UserMeal
): Promise<Result<UserMeal, unknown>> => {
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
    return { result: "success", data: mealSetting };
  } catch (error) {
    console.log("deleteMealSetting", { error });
    return { result: "error", error };
  }
};

const updateUserMeal = async (
  user: UserAccount,
  userMeal: UserMeal
): Promise<Result<UserMeal, unknown>> => {
  try {
    if (!userMeal.id) throw Error;
    const docRef = doc(db, "users", user?.user_id, "meals", userMeal.id);
    await setDoc(docRef, userMeal);
    return { result: "success", data: userMeal };
  } catch (error) {
    console.log("updateUserMeal", { error });
    return { result: "error", error };
  }
};

const defaultMeals: UserMealsArr = [
  {
    cook: true,
    id: "def-1",
    setting_id: null,
    name: "Breakfast",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
  {
    cook: true,
    id: "def-2",
    setting_id: null,
    name: "Lunch",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
  {
    cook: true,
    id: "def-3",
    setting_id: null,
    name: "Dinner",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
  {
    cook: true,
    id: "def-4",
    setting_id: null,
    name: "Snack",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
];

const createDefaultMealsSettings = async (
  user: UserAccount
): Promise<Result<UserMeals, unknown>> => {
  try {
    const promises = defaultMeals.map(async (meal) => {
      const res = await updateMealSetting(user, meal);
      if (res.result === "error") throw Error;
    });
    await Promise.all(promises);

    const res = await fetchMealsSettings(user.user_id);
    if (res.result === "error") throw Error;
    return { result: "success", data: res.data };
  } catch (error) {
    console.log("createDefaultMealsSettings", { error });
    return { result: "error", error };
  }
};

const createDefaultUserMeals = async (
  user: UserAccount
): Promise<Result<UserMeals, unknown>> => {
  try {
    const promises = defaultMeals.map(async (meal, index) => {
      const newUserMeal = {
        ...meal,
        order: index,
        setting_id: meal.id,
      };
      const res = await updateUserMeal(user, newUserMeal);
      if (res.result === "error") throw Error;
    });
    await Promise.all(promises);

    const res = await fetchMeals(user.user_id);
    if (res.result === "error") throw Error;
    return { result: "success", data: res.data };
  } catch (error) {
    console.log("createDefaultUserMeals", { error });
    return { result: "error", error };
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
  createDefaultUserMeals,
  createDefaultMealsSettings,
  updateMealSetting,
};
