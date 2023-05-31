export interface UserMeal {
  [id: string]: any;
  cook: boolean;
  setting_id: string | null;
  id: string | null;
  name: string | null;
  order: number;
  size: MealSizes;
  time: MealMinutes;
  complexity: MealComplexities;
}

export enum MealCook {
  yes = "yes",
  no = "no",
}

export enum MealSizes {
  tiny = 300,
  small = 500,
  normal = 700,
  big = 1000,
  huge = 10000,
}
export type MealSizesType = {
  [key in keyof typeof MealSizes]?: (typeof MealSizes)[key];
};

export const matchSize = (size: number, toEval: number): boolean => {
  switch (toEval) {
    case MealSizes.tiny:
      return size >= 0 && size < 300;
    case MealSizes.small:
      return size >= 300 && size < 500;
    case MealSizes.normal:
      return size >= 500 && size < 700;
    case MealSizes.big:
      return size >= 700 && size < 1000;
    case MealSizes.huge:
      return size >= 1000;
    default:
      return false;
  }
};

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

export const matchComplexity = (
  complexity: number,
  toEval: number
): boolean => {
  switch (toEval) {
    case MealComplexities.very_simple:
      return complexity >= 1 && complexity < 2;
    case MealComplexities.simple:
      return complexity >= 2 && complexity < 3;
    case MealComplexities.moderate:
      return complexity >= 3 && complexity < 4;
    case MealComplexities.complex:
      return complexity >= 4;
    default:
      return false;
  }
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
  cook: true,
  id: null,
  setting_id: null,
  name: null,
  order: -1,
  size: MealSizes.normal,
  time: MealMinutes.less_than_30_min,
  complexity: MealComplexities.moderate,
};
