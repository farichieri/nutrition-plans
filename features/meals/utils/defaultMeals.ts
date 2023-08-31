import {
  MealComplexities,
  MealMinutes,
  MealSizes,
  UserMealsArr,
} from "../types";

const defaultMeals: UserMealsArr = [
  {
    isCookeable: true,
    id: "def-1",
    mealSettingId: null,
    name: "Breakfast",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isBreakfast",
  },
  {
    isCookeable: true,
    id: "def-2",
    mealSettingId: null,
    name: "Lunch",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isLunch",
  },
  {
    isCookeable: true,
    id: "def-3",
    mealSettingId: null,
    name: "Dinner",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isDinner",
  },
  {
    isCookeable: true,
    id: "def-4",
    mealSettingId: null,
    name: "Snack",
    order: -1,
    size: MealSizes.Normal,
    time: MealMinutes.less_than_30_min,
    complexity: MealComplexities.moderate,
    type: "isSnack",
  },
];

export default defaultMeals;
