import { FoodGroup, NutrientsT } from "@/features/foods";
import { MealComplexities, MealMinutes, MealSizes } from "@/features/meals";
import { NewFood, NewNutrients } from "@/features/foods/types";
import {
  NutritionTargets,
  newNutritionTargets,
} from "@/features/authentication/types";
import { PlansEnum } from "@/types";

export enum PlanTypes {
  automatically = "automatically",
  manually = "manually",
}

export type PlanTypesT = {
  [key in PlanTypes]: string;
};

export enum PlanDateType {
  day = "day",
  week = "week",
}

export interface Diet {
  [id: string]: any;
  date: string | null;
  dateCreated: string | null;
  description: string | null;
  exercise: DietExercise;
  id: string | null;
  meals: DietMealGroup;
  name: string | null;
  note: string | null;
  nutrients: NutrientsT;
  planID: PlansEnum | null;
  type: PlanTypes;
  userID: string | null;
  water: DietWater;
  nutritionTargets: NutritionTargets;
  hideNutritionTargetsDiff: boolean;
}

export interface DietGroupArray extends Array<Diet> {}

export interface DietMeal {
  [id: string]: any;
  complexity: MealComplexities | null;
  dateCreated: string | null;
  description: string | null;
  dietID: string | null;
  foods: FoodGroup;
  id: string | null;
  isCookeable: boolean;
  mealID: string | null;
  name: string | null;
  nameSaved: string | null;
  order: number;
  planID: PlansEnum | null;
  size: MealSizes | null;
  time: MealMinutes | null;
}

export interface DietMealGroup {
  [id: string]: DietMeal;
}

export interface DietMealGroupArr extends Array<DietMeal> {}

export interface DietGroup {
  [id: string]: Diet;
}

export interface DietWater {
  drunk: boolean;
  littersDrunk: number;
  littersToDrink: number;
}

export interface DietExercise {
  exercised: boolean;
  isPlanned: boolean;
  note: string | null;
}

// Initials
export const NewDietWater: DietWater = {
  drunk: false,
  littersDrunk: 0,
  littersToDrink: 0,
};

export const NewDiet: Diet = {
  date: null,
  dateCreated: null,
  description: null,
  hideNutritionTargetsDiff: false,
  id: null,
  meals: {},
  name: null,
  note: null,
  nutrients: NewNutrients,
  nutritionTargets: newNutritionTargets,
  planID: null,
  type: PlanTypes.manually,
  userID: null,
  water: NewDietWater,
  exercise: {
    exercised: false,
    isPlanned: false,
    note: null,
  },
};

export const NewDietMeal: DietMeal = {
  complexity: null,
  dateCreated: null,
  diet_meal_type: null,
  dietID: null,
  foods: NewFood,
  id: null,
  isCookeable: true,
  mealID: null,
  name: null,
  order: -1,
  size: null,
  time: null,
  description: null,
  planID: null,
  nameSaved: null,
};
