export interface UserMeal {
  [id: string]: any;
  complexity: MealComplexities;
  cook: boolean;
  id: string | null;
  name: string | null;
  order: number;
  setting_id: string | null;
  size: MealSizes;
  time: MealMinutes;
}

export enum MealCook {
  yes = "yes",
  no = "no",
}

export enum MealSizes {
  tiny = 50,
  small = 75,
  normal = 100,
  big = 125,
  huge = 150,
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
  cook: true,
  id: null,
  setting_id: null,
  name: null,
  order: -1,
  size: MealSizes.normal,
  time: MealMinutes.less_than_30_min,
  complexity: MealComplexities.moderate,
};
