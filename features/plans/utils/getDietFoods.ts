import { FoodGroup } from "@/features/foods";
import { Diet, DietMealGroup } from "../types";

const getDietMealsFoods = ({
  diet_meals,
}: {
  diet_meals: DietMealGroup;
}): FoodGroup => {
  let result: FoodGroup = {};
  Object.keys(diet_meals).map((meal_id) => {
    const diet_meal = diet_meals[meal_id];
    const foods = diet_meal.diet_meal_foods;
    Object.keys(foods).map((food_id, index) => {
      result[meal_id + "_" + index] = foods[food_id];
    });
  });
  return result;
};

const getDietFoods = ({ diet }: { diet: Diet }): FoodGroup => {
  return getDietMealsFoods({ diet_meals: diet.diet_meals });
};

export { getDietFoods };
