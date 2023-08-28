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
import { db } from "../../../services/firebase";
import { Result } from "@/types";
import { User } from "@/features/authentication";
import { buildCupboardList } from "@/features/shopping/utils/buildCupboardList";
import { Cupboard, ShoppingListFoods } from "@/features/shopping";

const fetchMeals = async (
  userID: string
): Promise<Result<UserMeals, unknown>> => {
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

const createMealSetting = async (user: User, mealSetting: UserMeal) => {
  try {
    const newMealSettingRef = doc(
      collection(db, "users", user.id, "settings", "mealsSettings", "meals")
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
  user: User,
  mealSetting: UserMeal
): Promise<Result<UserMeal, unknown>> => {
  try {
    if (!mealSetting.id) throw Error;
    const mealSettingRef = doc(
      db,
      "users",
      user.id,
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

const createUserMeal = async (user: User, mealSetting: UserMeal) => {
  try {
    const newUserMeal = doc(collection(db, "users", user.id, "meals"));
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
  user: User,
  mealSetting: UserMeal
): Promise<Result<UserMeal, unknown>> => {
  try {
    if (!mealSetting.id) throw Error;
    const docRef = doc(db, "users", user.id, "meals", mealSetting.id);
    await deleteDoc(docRef);
    return { result: "success", data: mealSetting };
  } catch (error) {
    console.log("deleteUserMeal", { error });
    return { result: "error", error };
  }
};

const deleteMealSetting = async (
  user: User,
  mealSetting: UserMeal
): Promise<Result<UserMeal, unknown>> => {
  try {
    if (!mealSetting.id) throw Error;
    const docRef = doc(
      db,
      "users",
      user.id,
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
  user: User,
  userMeal: UserMeal
): Promise<Result<UserMeal, unknown>> => {
  try {
    if (!userMeal.id) throw Error;
    const docRef = doc(db, "users", user?.id, "meals", userMeal.id);
    await setDoc(docRef, userMeal);
    return { result: "success", data: userMeal };
  } catch (error) {
    console.log("updateUserMeal", { error });
    return { result: "error", error };
  }
};

const defaultMeals: UserMealsArr = [
  {
    isCookeable: true,
    id: "def-1",
    mealSettingId: null,
    name: "Breakfast",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isBreakfast",
  },
  {
    isCookeable: true,
    id: "def-2",
    mealSettingId: null,
    name: "Lunch",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isLunch",
  },
  {
    isCookeable: true,
    id: "def-3",
    mealSettingId: null,
    name: "Dinner",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isDinner",
  },
  {
    isCookeable: true,
    id: "def-4",
    mealSettingId: null,
    name: "Snack",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isSnack",
  },
];

const createDefaultMealsSettings = async (
  user: User
): Promise<Result<UserMeals, unknown>> => {
  try {
    const promises = defaultMeals.map(async (meal) => {
      const res = await updateMealSetting(user, meal);
      if (res.result === "error") throw Error;
    });
    await Promise.all(promises);

    const res = await fetchMealsSettings(user.id);
    if (res.result === "error") throw Error;
    return { result: "success", data: res.data };
  } catch (error) {
    console.log("createDefaultMealsSettings", { error });
    return { result: "error", error };
  }
};

const createDefaultUserMeals = async (
  user: User
): Promise<Result<UserMeals, unknown>> => {
  try {
    const promises = defaultMeals.map(async (meal, index) => {
      const newUserMeal = {
        ...meal,
        order: index,
        mealSettingId: meal.id,
      };
      const res = await updateUserMeal(user, newUserMeal);
      if (res.result === "error") throw Error;
    });
    await Promise.all(promises);

    const res = await fetchMeals(user.id);
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
