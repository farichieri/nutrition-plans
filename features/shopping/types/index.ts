import {
  FoodCategoriesKeys,
  FoodCategoriesValues,
  FoodScales,
} from "@/features/foods";

export interface ShoppingListFood {
  category: FoodCategoriesValues;
  id: string;
  imageURL: string;
  isCupboard: boolean;
  name: string;
  scaleAmount: number;
  scaleName: string;
  scales: FoodScales;
}

export interface CupboardFood extends ShoppingListFood {}

export interface ShoppingListFoods {
  [id: string]: ShoppingListFood;
}

export interface ShoppingListT {
  [foodCategory: string]: ShoppingListFoods;
}

export interface Cupboard {
  [id: string]: ShoppingListFood;
}
