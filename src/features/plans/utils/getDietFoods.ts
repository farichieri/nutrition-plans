import { FoodGroup } from "@/features/foods";
import { Diet, DietMealGroup } from "../types";

const getDietMealsFoods = ({ meals }: { meals: DietMealGroup }): FoodGroup => {
  let result: FoodGroup = {};
  Object.keys(meals).map((meal_id) => {
    const diet_meal = meals[meal_id];
    const foods = diet_meal.foods;
    Object.keys(foods).map((id, index) => {
      result[meal_id + "_" + index] = foods[id];
    });
  });
  return result;
};

const getDietFoods = ({ diet }: { diet: Diet }): FoodGroup => {
  return getDietMealsFoods({ meals: diet.meals });
};

export { getDietFoods };
