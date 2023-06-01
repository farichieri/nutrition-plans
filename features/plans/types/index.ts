import { FoodGroup, FoodNutrients } from "@/features/foods";
import { MealComplexities, MealMinutes } from "@/features/meals";
import { PlansEnum } from "@/types";
import { NewFood, NewFoodNutrients } from "@/types/initialTypes";

export interface Diet {
  [id: string]: any;
  date_available: string | null;
  date_created: any | null;
  diet_description: string | null;
  diet_id: string | null;
  diet_meals: DietMealGroup;
  diet_name_lowercase: string | null;
  diet_name: string | null;
  diet_nutrients: FoodNutrients;
  plan_date: string | null;
  plan_id: PlansEnum | null;
}

export interface DietMeal {
  [id: string]: any;
  diet_meal_name: string | null;
  user_meal_id: string | null;
  diet_meal_id: string | null;
  diet_meal_foods: FoodGroup;
  order: number;
  complexity: MealComplexities | null;
  time: MealMinutes | null;
}

export interface DietMealGroup {
  [id: string]: DietMeal;
}

export interface DietMealGroupArr extends Array<DietMeal> {}

export interface DietGroup {
  [id: string]: Diet;
}

// Initials
export const NewDiet: Diet = {
  date_available: null,
  date_created: null,
  diet_description: null,
  diet_id: null,
  diet_meals: {},
  diet_name_lowercase: null,
  diet_name: null,
  diet_nutrients: NewFoodNutrients,
  plan_date: null,
  plan_id: null,
};

export const NewDietMeal: DietMeal = {
  diet_meal_name: null,
  user_meal_id: null,
  diet_meal_foods: NewFood,
  diet_meal_id: null,
  diet_meal_type: null,
  order: -1,
  complexity: null,
  time: null,
};
