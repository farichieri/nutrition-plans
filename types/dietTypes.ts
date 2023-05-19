import {
  NewFood,
  NewFoodCompatiblePlans,
  NewFoodNutrients,
} from "./initialTypes";
import { CompatiblePlans, FoodGroup, FoodNutrients } from "./foodTypes";
import { MealsEnum, MealsType } from "./types";
import { uuidv4 } from "@firebase/util";

export interface Diet {
  [id: string]: any;
  compatible_plans: CompatiblePlans;
  date_available: string | null;
  date_created: any | null;
  diet_description: string | null;
  diet_id: string | null;
  diet_meals: DietMealGroup;
  diet_name_lowercase: string | null;
  diet_name: string | null;
  diet_nutrients: FoodNutrients;
  num_meals: number | null;
}

export interface DietMeal {
  [id: string]: any;
  diet_meal_id: string | null;
  diet_meal_foods: FoodGroup;
  diet_meal_type: MealsEnum | null; //breakfast, lunch, dinner, snack
  order: number | null;
}

export interface DietMealGroup {
  [id: string]: DietMeal;
}

export interface DietGroup {
  [id: string]: Diet;
}

export const FourDietMeals = (): DietMealGroup => {
  let dietMealGroup: DietMealGroup = {};
  Object.keys(MealsEnum).map((meal, index) => {
    const uuid = uuidv4();
    const mealType = MealsEnum[meal as keyof MealsType];
    const newDietMeal: DietMeal = {
      diet_meal_id: uuid,
      diet_meal_foods: {},
      diet_meal_type: mealType,
      order: index,
    };
    dietMealGroup[uuid] = newDietMeal;
  });
  return dietMealGroup;
};

// Initials
export const NewDiet: Diet = {
  compatible_plans: NewFoodCompatiblePlans,
  date_available: null,
  date_created: null,
  diet_description: null,
  diet_id: null,
  diet_meals: FourDietMeals(),
  diet_name_lowercase: null,
  diet_name: null,
  diet_nutrients: NewFoodNutrients,
  num_meals: null,
};

export const NewDietMeal: DietMeal = {
  diet_meal_foods: NewFood,
  diet_meal_id: null,
  diet_meal_type: null,
  order: null,
};
