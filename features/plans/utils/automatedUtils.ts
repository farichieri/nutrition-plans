import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
  fetchRandomFoodByPlan,
} from "@/features/plans";
import { FoodGroup } from "@/features/foods";
import { getDietFoods } from "../../../utils/foodsHelpers";
import { getDietNutrition, getNutritionValues } from "@/utils/nutritionHelpers";
import { MealComplexities, UserMealsArr } from "@/features/meals";
import { NutritionTargets } from "@/features/authentication";
import { PlansEnum, Result } from "@/types";
import { uuidv4 } from "@firebase/util";
import { round } from "@/utils/format";

const generateMeals = async (
  planID: PlansEnum,
  userMeals: UserMealsArr,
  nutrition_targets: NutritionTargets
): Promise<Result<DietMealGroup, unknown>> => {
  try {
    const generate = async (userMeals: UserMealsArr) => {
      const diet_meals: DietMealGroup = {};
      console.log({ userMeals });
      const mealsLength = userMeals.length;
      const { calories } = nutrition_targets;
      if (!calories) throw new Error("No calories provided");
      const calsPerMeal = calories / mealsLength;
      console.log({ calories });
      console.log({ calsPerMeal });

      const promises = userMeals.map(async (meal) => {
        const uuid = uuidv4();
        const foodsFetched: FoodGroup = {};
        const res = await fetchRandomFoodByPlan(planID, meal);
        if (res.result === "error") throw new Error("Error fetching food");
        const food = res.data;
        if (!food.food_id) throw Error("No food_id provided");
        const caloriesTarget = calsPerMeal;
        const { calories: foodCalories } = food.nutrients;
        const scales = food.scales;
        const scale = scales.find((scale) => scale.is_default === true);
        const scale_name = scale?.scale_name;
        if (!foodCalories || !scale_name)
          throw new Error("No foodCalories or foodScale provided");
        console.log(food.nutrients.calories, { food });
        let amount;
        amount = round(caloriesTarget / foodCalories, 0.5);
        amount = amount > 2 ? 2 : amount;
        const nutrientsUpdated = getNutritionValues(food, amount, scale_name);
        console.log({ nutrientsUpdated });

        foodsFetched[food.food_id] = {
          ...food,
          // scale_amount: amount,
          // scale_name: scale,
          nutrients: nutrientsUpdated,
        };
        // foodsFetched[food.food_id] = {
        //   ...food,
        //   scale_amount: amount,
        //   scale_name: scale,
        //   nutrients: nutrientsUpdated,
        // };

        console.log({ foodsFetched });

        const newDietMeal: DietMeal = {
          diet_meal_name: meal.name,
          user_meal_id: meal.id,
          diet_meal_id: uuid,
          diet_meal_foods: foodsFetched,
          order: meal.order,
          complexity: meal.complexity,
          time: meal.time,
          size: meal.size,
          cook: meal.cook,
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

export { generateMeals };
