import {
  fetchRandomFoodByPlan,
  getFoodsCollectionLength,
} from "@/firebase/helpers/Food";
import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
} from "@/types/dietTypes";
import { FoodGroup } from "@/types/foodTypes";
import { getDietFoods } from "./foodsHelpers";
import { getNutritionMerged } from "@/utils/nutritionHelpers";
import { NutritionTargets, PlansEnum, Result } from "@/types/types";
import { UserMealsArr } from "@/types/mealsSettingsTypes";
import { uuidv4 } from "@firebase/util";

const generateMeals = async (
  planID: PlansEnum,
  userMeals: UserMealsArr,
  nutrition_targets: NutritionTargets
): Promise<Result<DietMealGroup, unknown>> => {
  try {
    const res = await getFoodsCollectionLength();
    if (res.result === "error") {
      throw new Error("Error fetching collLength");
    }
    const { data: collLength } = res;
    console.log({ nutrition_targets });
    const generate = async (userMeals: UserMealsArr) => {
      const diet_meals: DietMealGroup = {};
      const promises = userMeals.map(async (meal) => {
        const uuid = uuidv4();
        const foodsFetched: FoodGroup = {};
        // Fetch 1 per meal
        const res = await fetchRandomFoodByPlan(planID, collLength, meal);
        if (res.result === "error") throw new Error("Error fetching food");
        const { data: food } = res;
        if (!food.food_id) throw Error("No food_id provided");
        console.log({ food });
        foodsFetched[food.food_id] = food;

        const newDietMeal: DietMeal = {
          diet_meal_name: meal.name,
          user_meal_id: meal.id,
          diet_meal_id: uuid,
          diet_meal_foods: foodsFetched,
          order: meal.order,
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

export { generateMeals, buildDiet };
