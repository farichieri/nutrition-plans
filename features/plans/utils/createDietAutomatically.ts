import { createDiet } from "./createDiet";
import { FoodHitsGroup, fetchFoods } from "@/features/foods";
import type { Diet, DietMeal, PlanTypes } from "../types";
import type { NutritionTargets, User } from "@/features/authentication";
import type { PlansEnum, Result } from "@/types";
import type { UserMeals } from "@/features/meals";
import { getNutritionMerged } from "@/utils";

const calculateMealsNutrtionTargets = ({
  meals,
  totalTargets,
}: {
  meals: UserMeals;
  totalTargets: NutritionTargets;
}) => {
  // Equally distribute the nutrition targets between the meals
  // Later it will pay attention to the meal settings.
  const { calories, carbohydrates, fats, proteins } = totalTargets;
  const mealsLength = Object.keys(meals).length;
  const caloriesPerMeal = calories / mealsLength;

  return { calories: caloriesPerMeal };
};

const getPlanFoods = async ({
  planID,
  user,
}: {
  planID: PlansEnum;
  user: User;
}): Promise<Result<FoodHitsGroup, unknown>> => {
  try {
    if (!planID) throw new Error("No planID");

    const res = await fetchFoods({
      queries: { q: "", plan: planID },
      uploaderID: user.id,
    });
    if (res.result === "error") throw new Error("Error fetching foods");
    return { result: "success", data: res.data };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

const buildMealFoods = ({
  planFoods,
  meal,
  calories,
}: {
  planFoods: FoodHitsGroup;
  meal: DietMeal;
  calories: number;
}) => {
  let reachedCalories = 0;
  let newFoods: FoodHitsGroup = {};
  const foodsPerMeal = 3;

  console.log({ calories });

  console.log({ newFoods });
};

const createDietAutomatically = async ({
  meals,
  planID,
  type,
  user,
}: {
  meals: UserMeals;
  planID: PlansEnum;
  type: PlanTypes;
  user: User;
}): Promise<Result<Diet, unknown>> => {
  try {
    const emptyDiet = createDiet({
      meals,
      planID,
      type,
      user,
    });
    console.log({ emptyDiet });

    let newMeals = emptyDiet.meals;

    // All equal
    const { calories } = calculateMealsNutrtionTargets({
      meals,
      totalTargets: user.nutritionTargets,
    });

    const res = await getPlanFoods({ planID, user });
    if (res.result === "error") throw new Error("Error fetching plan foods");
    const planFoods = res.data;
    console.log({ planFoods });

    for (const mealID in newMeals) {
      const meal = newMeals[mealID];
      const newFoods = buildMealFoods({ planFoods, meal, calories });
      // newMeals[mealID].foods = newFoods;
    }
    return { result: "success", data: emptyDiet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export default createDietAutomatically;

// I could add the type of the food (breakfast, lunch, dinner, snack) to typesense to filter easily.
