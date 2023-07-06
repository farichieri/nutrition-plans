import { Food, FoodGroup, IngredientGroup } from "@/features/foods";

const getIngredientsFoods = (ingredients: IngredientGroup): FoodGroup => {
  let result: FoodGroup = {};
  Object.keys(ingredients).map((ing) => {
    const food = ingredients[ing];
    if (food.id) {
      result[food.id as keyof Food] = food;
    }
  });
  return result;
};

export { getIngredientsFoods };
