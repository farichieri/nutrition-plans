import { FoodCategories } from "@/features/foods";
import { ShoppingListFoods, ShoppingListT } from "../types";

const buildCupboardList = ({
  cupboardFoods,
}: {
  cupboardFoods: ShoppingListFoods;
}): ShoppingListT => {
  const foodCategories = Object.keys(FoodCategories);
  const list: ShoppingListT = {};

  foodCategories.forEach((category: string) => {
    list[category] = {};
  });

  Object.keys(cupboardFoods).forEach((food_meal_id) => {
    const food = cupboardFoods[food_meal_id];

    list[food.category!][food_meal_id] = {
      category: food.category!,
      id: food.id!,
      imageURL: food.imageURL,
      isCupboard: false,
      name: food.name!,
      scaleAmount: food.scaleAmount,
      scaleName: food.scaleName,
      scales: food.scales,
    };
  });

  return list;
};

export { buildCupboardList };
