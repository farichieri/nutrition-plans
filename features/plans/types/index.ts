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
  date_available: string | null;
  date_created: any | null;
  diet_description: string | null;
  diet_id: string | null;
  diet_meals: DietMealGroup;
  diet_name_lowercase: string | null;
  diet_name: string | null;
  diet_nutrition: FoodNutrients;
  diet_water: DietWater;
  plan_date: string | null;
  plan_id: PlansEnum | null;
  plan_type: PlanTypes;
  user_id: string | null;
}

export interface DietMeal {
  [id: string]: any;
  complexity: MealComplexities | null;
  cook: boolean;
  diet_id: string | null;
  diet_meal_foods: FoodGroup;
  diet_meal_id: string | null;
  diet_meal_name: string | null;
  order: number;
  size: MealSizes | null;
  time: MealMinutes | null;
  user_meal_id: string | null;
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
  litters_drunk: number;
  litters_to_drink: number;
}

// Initials
export const NewDietWater: DietWater = {
  drunk: false,
  litters_drunk: 0,
  litters_to_drink: 0,
};

export const NewDiet: Diet = {
  date_available: null,
  date_created: null,
  diet_description: null,
  diet_id: null,
  diet_meals: {},
  diet_name_lowercase: null,
  diet_name: null,
  diet_nutrition: NewFoodNutrients,
  diet_water: NewDietWater,
  plan_date: null,
  plan_id: null,
  plan_type: PlanTypes.manually,
  user_id: null,
};

export const NewDietMeal: DietMeal = {
  complexity: null,
  cook: true,
  diet_id: null,
  diet_meal_foods: NewFood,
  diet_meal_id: null,
  diet_meal_name: null,
  diet_meal_type: null,
  order: -1,
  size: null,
  time: null,
  user_meal_id: null,
};
