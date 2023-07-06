import { FoodGroup, FoodNutrients } from "@/features/foods";
import { MealComplexities, MealMinutes, MealSizes } from "@/features/meals";
import { PlansEnum } from "@/types";
import { NewFood, NewFoodNutrients } from "@/types/initialTypes";

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
  dateAvailable: string | null;
  dateCreated: any | null;
  description: string | null;
  id: string | null;
  meals: DietMealGroup;
  name: string | null;
  nameLowerCase: string | null;
  nutrients: FoodNutrients;
  planID: PlansEnum | null;
  type: PlanTypes;
  userID: string | null;
  water: DietWater;
}

export interface DietMeal {
  [id: string]: any;
  complexity: MealComplexities | null;
  dietID: string | null;
  foods: FoodGroup;
  id: string | null;
  isCookeable: boolean;
  mealID: string | null;
  name: string | null;
  order: number;
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
  litterDrunk: number;
  littersToDrink: number;
}

// Initials
export const NewDietWater: DietWater = {
  drunk: false,
  litterDrunk: 0,
  littersToDrink: 0,
};

export const NewDiet: Diet = {
  date: null,
  dateAvailable: null,
  dateCreated: null,
  description: null,
  id: null,
  meals: {},
  name: null,
  nameLowerCase: null,
  nutrients: NewFoodNutrients,
  planID: null,
  type: PlanTypes.manually,
  userID: null,
  water: NewDietWater,
};

export const NewDietMeal: DietMeal = {
  complexity: null,
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
};
