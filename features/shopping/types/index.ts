import { FoodGroup } from "@/features/foods";

export interface ListItemT {
  category: string;
  foods: FoodGroup;
}

export interface ShoppingListT extends Array<ListItemT> {}
