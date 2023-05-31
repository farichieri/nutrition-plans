import { NewFood } from "./initialTypes";
import { Food } from "./foodTypes";

export interface Meal extends Food {}

// Initials
export const NewMeal: Meal = NewFood;
