export interface UserMeal {
  [id: string]: any;
  cook: boolean;
  id: string | null;
  name: string | null;
  order: number;
  size: MealSizes;
  time: MealMinutes;
}

export enum MealCook {
  yes = "yes",
  no = "no",
}

export enum MealSizes {
  tiny = 0.25,
  small = 0.5,
  normal = 1,
  big = 1.25,
  huge = 1.5,
}
export type MealSizesType = {
  [key in keyof typeof MealSizes]?: (typeof MealSizes)[key];
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
  name: null,
  order: -1,
  size: MealSizes.normal,
  time: MealMinutes.less_than_30_min,
};
