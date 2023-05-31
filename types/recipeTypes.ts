import { NewFood } from "./initialTypes";
import { Food } from "../features/foods/types";

export interface Recipe extends Food {}

// Initials
export const NewMeal: Recipe = NewFood;
