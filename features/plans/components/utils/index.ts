import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
  fetchRandomFoodByPlan,
} from "@/features/plans";
import { FoodGroup } from "@/features/foods";
import { getDietFoods } from "../../../../utils/foodsHelpers";
import { getNutritionMerged } from "@/utils/nutritionHelpers";
import { MealComplexities, UserMealsArr } from "@/features/meals";
import { NutritionTargets } from "@/features/authentication";
import { PlansEnum, Result } from "@/types";
import { uuidv4 } from "@firebase/util";

const generateMeals = async (
  planID: PlansEnum,
  userMeals: UserMealsArr,
  nutrition_targets: NutritionTargets
): Promise<Result<DietMealGroup, unknown>> => {
  try {
    const generate = async (userMeals: UserMealsArr) => {
      const diet_meals: DietMealGroup = {};
      const promises = userMeals.map(async (meal) => {
        const uuid = uuidv4();
        const foodsFetched: FoodGroup = {};
        const res = await fetchRandomFoodByPlan(planID, meal);
        if (res.result === "error") throw new Error("Error fetching food");
        const { data: food } = res;
        if (!food.food_id) throw Error("No food_id provided");
        foodsFetched[food.food_id] = food;

        const newDietMeal: DietMeal = {
          diet_meal_name: meal.name,
          user_meal_id: meal.id,
          diet_meal_id: uuid,
          diet_meal_foods: foodsFetched,
          order: meal.order,
          complexity: meal.complexity,
          time: meal.time,
        };
        if (newDietMeal.diet_meal_id) {
          diet_meals[newDietMeal.diet_meal_id] = newDietMeal;
        }
      });
      await Promise.all(promises);
      return diet_meals;
    };

    const mealsGenerated = await generate(userMeals);
    return { result: "success", data: mealsGenerated };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

const buildDiet = (meals: DietMealGroupArr, planID: PlansEnum) => {
  const dietMeals: DietMealGroup = {};
  meals.forEach((m) => {
    if (!m.diet_meal_id) return;
    dietMeals[m.diet_meal_id as keyof DietMeal] = m;
  });
  const foods = getDietFoods(dietMeals);
  const nutrition = getNutritionMerged(foods);

  const diet: Diet = {
    ...NewDiet,
    date_available: null,
    date_created: null,
    diet_description: null,
    diet_id: null,
    diet_meals: dietMeals,
    diet_name_lowercase: null,
    diet_name: null,
    diet_nutrients: nutrition,
    plan_date: null,
    plan_id: planID,
  };

  return diet;
};

const matchComplexity = (complexity: number, toEval: number): boolean => {
  switch (toEval) {
    case MealComplexities.very_simple:
      return complexity >= 1 && complexity < 2;
    case MealComplexities.simple:
      return complexity >= 2 && complexity < 3;
    case MealComplexities.moderate:
      return complexity >= 3 && complexity < 4;
    case MealComplexities.complex:
      return complexity >= 4;
    default:
      return false;
  }
};

const maxComplexity = (toEval: number): number => {
  switch (toEval) {
    case MealComplexities.very_simple:
      return MealComplexities.simple;
    case MealComplexities.simple:
      return MealComplexities.moderate;
    case MealComplexities.moderate:
      return MealComplexities.complex;
    case MealComplexities.complex:
      return Infinity;
    default:
      return Infinity;
  }
};

export { generateMeals, buildDiet, matchComplexity, maxComplexity };
