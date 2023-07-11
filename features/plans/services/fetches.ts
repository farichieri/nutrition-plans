import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { Food, FoodGroupArray } from "@/features/foods";
import { maxComplexity, Diet } from "@/features/plans";
import { PlansEnum, Result } from "@/types";
import { UserMeal } from "@/features/meals";

const fetchDietByDate = async ({
  date,
  userID,
}: {
  date: string;
  userID: string;
}): Promise<Result<Diet, unknown>> => {
  try {
    const docRef = doc(db, "users", userID, "diets", date);
    const querySnapshot = await getDoc(docRef);
    const data: any = querySnapshot.data();
    if (!data) throw new Error("No data fetched.");
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

const fetchRandomFoodByPlan = async (
  plan: PlansEnum,
  userMeal: UserMeal
): Promise<Result<Food, unknown>> => {
  try {
    let data: Food | null = null;
    const docRef = collection(db, "foods");
    const complexity = userMeal.complexity;
    const max_complexity = maxComplexity(complexity);

    let q = query(
      docRef,
      where(`compatiblePlans.${plan}`, "==", true),
      where("complexity", ">=", complexity),
      where("complexity", "<", max_complexity),
      orderBy("complexity")
    );

    const fetchMatchingFoods = async (q_selected: any) => {
      const matchingFoods: FoodGroupArray = [];
      const querySnapshot = await getDocs(q_selected);
      querySnapshot.forEach((food: any) => {
        const res = food.data();
        if (res) {
          matchingFoods.push(res);
        }
      });
      return matchingFoods;
    };

    const filterMatchingFoods = (
      matchingFoods: FoodGroupArray
    ): FoodGroupArray => {
      let foodsFiltered = matchingFoods;
      // cook
      if (!userMeal.isCookeable) {
        foodsFiltered = matchingFoods.filter((food) => {
          if (food.cookTime < 1) return food;
        });
      }
      // time
      foodsFiltered = foodsFiltered.filter((food) => {
        const available_time = food.prepTime + food.cookTime;
        if (available_time < userMeal.time) return food;
      });
      // size
      return foodsFiltered;
    };

    const chooseOne = (foodsFiltered: FoodGroupArray): Food => {
      const length = foodsFiltered.length;
      const randomIndex = Math.floor(length * Math.random());
      return foodsFiltered[randomIndex];
    };

    const matchingFoods = await fetchMatchingFoods(q);
    const matchingFoodsFiltered = filterMatchingFoods(matchingFoods);
    const matchingFood = chooseOne(matchingFoodsFiltered);
    if (!matchingFood) {
      data = chooseOne(matchingFoods);
    } else {
      data = matchingFood;
    }

    if (!data) throw new Error("No foods fetched");
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

export { fetchDietByDate, fetchRandomFoodByPlan };
