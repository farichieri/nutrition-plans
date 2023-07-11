import { FoodCategoriesEnum } from "@/features/foods";
import { Cupboard, ShoppingListFoods } from "../types";

const buildCupboard = (): ShoppingListFoods => {
  const foodCategories = Object.keys(FoodCategoriesEnum);
  const cupboard: ShoppingListFoods = {};

  return cupboard;
};

export { buildCupboard };
