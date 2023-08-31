import { createDiet } from "./createDiet";
import {
  Food,
  FoodGroup,
  FoodHitsGroup,
  FoodType,
  fetchFoodByID,
  fetchFoods,
} from "@/features/foods";
import type { Diet, DietMeal, PlanTypes } from "../types";
import type { NutritionTargets, User } from "@/features/authentication";
import type { PlansEnum, Result } from "@/types";
import type { UserMeals } from "@/features/meals";
import { getDietNutrition, round, updateFoodScale } from "@/utils";

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

const getRandomNum = (length: number) => {
  return Math.floor(Math.random() * length);
};

const buildMealFoods = async ({
  planFoods,
  meal,
  calories,
}: {
  planFoods: FoodHitsGroup;
  meal: DietMeal;
  calories: number;
}): Promise<Result<FoodGroup, unknown>> => {
  try {
    let reachedCalories = 0;
    let newFoods: FoodGroup = {};
    const foodsPerMeal = 3;
    const planFoodsArr = Object.values(planFoods);
    // Check if type of food is allowed in the meal.
    const planFoodsTypeArr = planFoodsArr.filter(
      (food) => food.type[meal.type as keyof FoodType] === true
    );
    const length = Object.keys(planFoodsTypeArr).length;

    const promises = Array.from({ length: foodsPerMeal }).map(
      async (f, index) => {
        const randomIndex = getRandomNum(length);
        console.log({ randomIndex, length });
        const randomFoodId = planFoodsTypeArr[randomIndex].id;

        const res = await fetchFoodByID(randomFoodId!);
        if (res.result === "error") throw new Error("Error fetching food");
        const food: Food = res.data;

        // const { calories: foodCalories } = getNutritionMerged(food);
        reachedCalories += Number(food.nutrients.calories);
        newFoods[food.id!] = {
          ...food,
          dietID: meal.dietID,
          dietMealID: meal.id,
          order: index,
        };
      }
    );
    await Promise.all(promises);

    // If the calories are not reached, re-scale the foods.
    if (reachedCalories < calories) {
      const difference = calories - reachedCalories;
      const diffRatio = difference / reachedCalories;
      const newFoodsArr = Object.values(newFoods);

      console.log({ calories, reachedCalories, difference, diffRatio });

      newFoodsArr.map((food) => {
        const scalesMerged = food.scales;
        const scale = scalesMerged.find((scale) => scale.isDefault === true);
        if (scale) {
          let scaleAmount = scale.scaleAmount + scale.scaleAmount * diffRatio;
          scaleAmount = round(scaleAmount, 0.5);
          const scaleName = scale.scaleName;

          const newFood = updateFoodScale({
            food,
            scaleAmount,
            scaleName,
          });

          console.log({ newFood });
          newFoods[food.id!] = newFood;
        }
      });
    }

    console.log({ calories, reachedCalories });
    console.log({ newFoods });
    return { result: "success", data: newFoods };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

const createDietAutomatically = async ({
  date,
  meals,
  planID,
  type,
  user,
}: {
  date: string;
  meals: UserMeals;
  planID: PlansEnum;
  type: PlanTypes;
  user: User;
}): Promise<Result<Diet, unknown>> => {
  try {
    // Create the diet. (Empty)
    let newDiet = createDiet({
      meals,
      planID,
      type,
      user,
      date,
    });
    console.log({ newDiet });
    let newMeals = newDiet.meals;

    // Calculate the nutrition targets for each meal. (in this case it's Equally distributed)
    const { calories } = calculateMealsNutrtionTargets({
      meals,
      totalTargets: user.nutritionTargets,
    });

    // Get the foods of the plan.
    const res = await getPlanFoods({ planID, user });
    if (res.result === "error") throw new Error("Error fetching plan foods");
    const planFoods = res.data;

    const promises = Object.values(newMeals).map(async (meal) => {
      const res = await buildMealFoods({ planFoods, meal, calories });
      if (res.result === "error") throw new Error("Error building meal foods");
      newMeals[meal.id!].foods = res.data;
    });
    await Promise.all(promises);

    // Update the diet with the new meals.
    newDiet.meals = newMeals;
    const nutrition = getDietNutrition(newDiet.meals);
    newDiet.nutrition = nutrition;

    console.log({ newDiet });
    return { result: "success", data: newDiet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export default createDietAutomatically;

// I could add the type of the food (breakfast, lunch, dinner, snack) to typesense to filter easily.
