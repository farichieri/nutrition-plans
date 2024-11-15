import { FoodTypesT } from "@/features/foods";

export interface UserMeal {
  [id: string]: any;
  complexity: MealComplexities;
  id: string | null;
  isCookeable: boolean;
  mealSettingId: string | null;
  name: string | null;
  order: number;
  size: MealSizes;
  time: MealMinutes;
  type: FoodTypesT | null;
}

export enum MealCook {
  Yes = "yes",
  No = "no",
}

export enum MealSizes {
  Tiny = 50,
  Small = 75,
  Normal = 100,
  Big = 125,
  Huge = 150,
}
export type MealSizesType = {
  [key in keyof typeof MealSizes]?: (typeof MealSizes)[key];
};

// export const matchSize = (size: number, toEval: number): boolean => {
//   switch (toEval) {
//     case MealSizes.tiny:
//       return size >= 0 && size < 300;
//     case MealSizes.small:
//       return size >= 300 && size < 500;
//     case MealSizes.normal:
//       return size >= 500 && size < 700;
//     case MealSizes.big:
//       return size >= 700 && size < 1000;
//     case MealSizes.huge:
//       return size >= 1000;
//     default:
//       return false;
//   }
// };

// 1 Ingredient = 1
// 1 min Prep Time = 1
// 1 min Cook Time = 0.2
export enum MealComplexities {
  very_simple = 1,
  simple = 2,
  moderate = 3,
  complex = 4,
}
export type MealComplexitiesType = {
  [key in keyof typeof MealComplexities]?: (typeof MealComplexities)[key];
};

export enum MealMinutes {
  no_time = 0,
  less_than_5_min = 5,
  less_than_15_min = 15,
  less_than_30_min = 30,
  less_than_45_min = 45,
  less_than_60_min = 60,
  no_limit = 1000,
}
export type MealMinutesType = {
  [key in keyof typeof MealMinutes]?: (typeof MealMinutes)[key];
};

export interface UserMeals {
  [id: string]: UserMeal;
}

export interface MealsSettings extends UserMeals {}
export interface UserMealsArr extends Array<UserMeal> {}

// Initial
export const NewMealSetting: UserMeal = {
  complexity: MealComplexities.moderate,
  id: null,
  isCookeable: true,
  mealSettingId: null,
  name: null,
  order: -1,
  size: MealSizes.Normal,
  time: MealMinutes.less_than_30_min,
  type: null,
};
