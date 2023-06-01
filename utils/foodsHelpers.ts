import { DietMealGroup } from "@/features/plans";
import { Food, FoodGroup, IngredientGroup } from "@/features/foods";

const getIngredientsFoods = (ingredients: IngredientGroup): FoodGroup => {
  let result: FoodGroup = {};
  Object.keys(ingredients).map((ing) => {
    const food = ingredients[ing];
    if (food.food_id) {
      result[food.food_id as keyof Food] = food;
    }
  });
  return result;
};

const getDietFoods = (diet_meals: DietMealGroup): FoodGroup => {
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

export { getIngredientsFoods, getDietFoods };
