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
} from "@/types/mealsSettingsTypes";
import { db } from "../firebase.config";
import { UserAccount } from "@/types/types";
import { UserMealsArr } from "@/types/mealsSettingsTypes";
import { MealSizes } from "@/types/mealsSettingsTypes";
import { MealMinutes } from "@/types/mealsSettingsTypes";

const fetchMeals = async (userID: string) => {
  console.log("Fetching Meals");
  try {
    let data: UserMeals = {};
    const userMealsRef = query(collection(db, "users", userID, "meals"));
    const querySnapshot = await getDocs(userMealsRef);
    querySnapshot.forEach((meal: any) => {
      data[meal.id] = meal.data();
    });
    return { data };
  } catch (error) {
    console.log("fetchMeals", { error });
    return { error };
  }
};

const fetchMealsSettings = async (userID: string) => {
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
    return { data };
  } catch (error) {
    console.log("fetchMealsSettings", { error });
    return { error };
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

const defaultMeals: UserMealsArr = [
  {
    cook: true,
    id: null,
    name: "Breakfast",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
  {
    cook: true,
    id: null,
    name: "Lunch",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
  {
    cook: true,
    id: null,
    name: "Dinner",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
  {
    cook: true,
    id: null,
    name: "Snack",
    order: -1,
    size: MealSizes.normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
  },
];

const createDefaultMealsSettings = async (user: UserAccount) => {
  try {
    defaultMeals.map(async (meal) => {
      const res = await createMealSetting(user, meal);
      if (res.error) throw Error;
    });
    const fetchRes = await fetchMealsSettings(user.user_id);
    if (!fetchRes.error) {
      return fetchRes;
    } else throw Error;
  } catch (error) {
    console.log("createDefaultMealsSettings", { error });
    return { error };
  }
};

const createDefaultUserMeals = async (user: UserAccount) => {
  try {
    defaultMeals.map(async (meal, index) => {
      const newUserMeal = {
        ...meal,
        order: index,
      };
      const res = await createUserMeal(user, newUserMeal);
      if (res.error) throw Error;
    });
    const fetchRes = await fetchMeals(user.user_id);
    if (!fetchRes.error) {
      return fetchRes;
    } else throw Error;
  } catch (error) {
    console.log("createDefaultUserMeals", { error });
    return { error };
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
};
