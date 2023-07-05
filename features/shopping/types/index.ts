import { FoodGroup, FoodScales } from "@/features/foods";

export interface ShoppingListT {
  [foodCategory: string]: {
    foods: FoodGroup;
  };
}
