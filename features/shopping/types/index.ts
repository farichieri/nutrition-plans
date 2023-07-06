import { FoodGroup, FoodScales, IngredientGroup } from "@/features/foods";

export interface ShoppingListFood {
  category: string;
  id: string;
  imageURL: string;
  isCupboard: boolean;
  name: string;
  scaleAmount: number;
  scaleName: string;
  scales: FoodScales;
}

export interface ShoppingListFoods {
  [id: string]: ShoppingListFood;
}

export interface ShoppingListT {
  [foodCategory: string]: {
    foods: ShoppingListFoods;
  };
}
