import { UserMeals } from "./mealsSettingsTypes";

export enum Theme {
  dark = "dark",
  light = "light",
}
export enum ButtonType {
  save = "save",
  delete = "delete",
  discard = "discard",
}
export enum SubscriptionState {
  free = "free",
  premium = "premium",
}
export enum MeasurementUnits {
  metric = "metric",
  imperial = "imperial",
}
export enum UserSteps {
  step_1 = "step_1",
  step_2 = "step_2",
  step_3 = "step_3",
}
export enum MealsEnum {
  breakfast = "breakfast",
  lunch = "lunch",
  dinner = "dinner",
  snack = "snack",
}
export enum PlansEnum {
  balanced = "balanced",
  gluten_free = "gluten_free",
  mediterranean = "mediterranean",
  vegetarian = "vegetarian",
  low_carb = "low_carb",
}
export enum FiltersEnum {
  q = "q",
  kind = "kind",
  plan = "plan",
  sort = "sort",
  calories_range = "calories_range",
  proteins_range = "proteins_range",
  carbs_range = "carbs_range",
  fats_range = "fats_range",
}
export enum FilterSortTypes {
  rating = "rating",
  higher_calories = "higher_calories",
  lower_calories = "lower_calories",
}

export type MealsType = {
  [key in keyof typeof MealsEnum]?: (typeof MealsEnum)[key];
};

// Posts
export interface Post {
  author: string;
  authorName: string;
  contentHtml: string;
  date: string;
  id: string;
  summary: string;
  title: string;
  topic: string;
}
export interface Posts extends Array<Post> {}
export interface PlanType {
  contentHtml: string;
  id: string;
  title: string;
  image: string;
}
export interface PlansType extends Array<PlanType> {}

// User
export interface UserAccount {
  body_data: UserBodyData;
  created_at: string | undefined;
  display_name: string;
  email_address: string | null;
  first_data: UserCreatedData;
  food_data: UserFoodData;
  is_admin: boolean;
  is_premium: boolean;
  is_profile_completed: boolean;
  lang: string;
  nutrition_targets: NutritionTargets;
  photo_url: string | null;
  plan_selected: string | null;
  premium_plan: string | null;
  ratings: Ratings;
  user_id: string;
  weight_goal: WeightGoal;
  user_step: UserSteps;
  user_meals: UserMeals;
}
export interface UserCreatedData {
  body_data: UserBodyData;
  food_data: UserFoodData;
}
export interface UserBodyData {
  activity: number | null;
  age: number | null;
  BMI: number | null;
  BMR: number | null;
  gender: string | null;
  goal: string | null;
  height_in_cm: number | null;
  kcals_recommended: number | null;
  measurement_unit: string | null;
  weight_in_kg: number | null;
}
export interface UserFoodData {
  compatible_plans: string[];
}

export interface WeightGoal {
  weight_goal_in_kg: number | null;
  created_at: string | null;
  due_date: string | null;
}

export interface NutritionTargets {
  carbohydrates: {
    min: number | null;
    max: number | null;
  };
  proteins: {
    min: number | null;
    max: number | null;
  };
  fats: {
    min: number | null;
    max: number | null;
  };
}

// User Progress
export interface ProgressItem {
  created_at: string;
  date: string;
  weight: number | null;
}
export interface Progress {
  [date: string]: ProgressItem;
}

// Plan
export interface PremiumPlan {
  id: string;
  title: string;
}
export interface SubscriptionPlan {
  buttonContent: string;
  checklist: string[];
  checklistTitle: string;
  checkoutLink: string;
  discount: string;
  monthlyPrice: number;
  name: string;
  plan_id: string;
  yearlyPrice: number;
}

// Rating
export interface Ratings {
  food_rating: FoodRating;
}

export interface FoodRating {
  favorites: string[];
  likes: string[];
  dislikes: string[];
}

export interface FilterQueries {
  q?: string;
  kind?: string;
  plan?: string;
  calories_range?: string;
  proteins_range?: string;
  carbs_range?: string;
  fats_range?: string;
  sort?: string;
}
