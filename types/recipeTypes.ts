import { NewFood } from "./initialTypes";
import { Food } from "./foodTypes";

export interface Recipe extends Food {}

// Initials
export const NewMeal: Recipe = NewFood;
