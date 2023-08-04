import {
  DietMeal,
  DietMealGroup,
  fetchRandomFoodByPlan,
} from "@/features/plans";
import { FoodGroup } from "@/features/foods";
import { getNutritionValues } from "@/utils/nutritionHelpers";
import { UserMealsArr } from "@/features/meals";
import { NutritionTargets } from "@/features/authentication";
import { PlansEnum, Result } from "@/types";
import { uuidv4 } from "@firebase/util";
import { round } from "@/utils/format";

const generateMeals = async (
  planID: PlansEnum,
  userMeals: UserMealsArr,
  nutritionTargets: NutritionTargets
): Promise<Result<DietMealGroup, unknown>> => {
  try {
    const generate = async (userMeals: UserMealsArr) => {
      const meals: DietMealGroup = {};
      console.log({ userMeals });
      const mealsLength = userMeals.length;
      const { calories } = nutritionTargets;
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
        if (!food.id) throw Error("No food id provided");
        const caloriesTarget = calsPerMeal;
        const { calories: foodCalories } = food.nutrients;
        const scales = food.scales;
        const scale = scales.find((scale) => scale.isDefault === true);
        const scaleName = scale?.scaleName;
        if (!foodCalories || !scaleName)
          throw new Error("No foodCalories or foodScale provided");
        console.log(food.nutrients.calories, { food });
        let amount;
        amount = round(caloriesTarget / foodCalories, 0.5);
        amount = amount > 2 ? 2 : amount;
        const nutrientsUpdated = getNutritionValues(food, amount, scaleName);
        console.log({ nutrientsUpdated });

        foodsFetched[food.id] = {
          ...food,
          // scaleAmount: amount,
          // scaleName: scale,
          nutrients: nutrientsUpdated,
        };
        // foodsFetched[food.food_id] = {
        //   ...food,
        //   scaleAmount: amount,
        //   scaleName: scale,
        //   nutrients: nutrientsUpdated,
        // };

        console.log({ foodsFetched });
        // To be fixed id
        // const newDietMeal: DietMeal = {
        //   name: meal.name,
        //   mealID: meal.id,
        //   id: uuid,
        //   foods: foodsFetched,
        //   order: meal.order,
        //   complexity: meal.complexity,
        //   time: meal.time,
        //   size: meal.size,
        //   isCookeable: meal.isCookeable,
        //   dietID: "",
        // };
        // if (newDietMeal.id) {
        //   meals[newDietMeal.id] = newDietMeal;
        // }
      });
      await Promise.all(promises);
      return meals;
    };

    const mealsGenerated = await generate(userMeals);
    return { result: "success", data: mealsGenerated };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { generateMeals };
