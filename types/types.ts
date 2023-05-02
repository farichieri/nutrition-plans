export enum Theme {
  dark = "dark",
  light = "light",
}
export enum ButtonType {
  save = "save",
  delete = "delete",
  discard = "discard",
}
export enum MeasurementUnits {
  metric = "metric",
  imperial = "imperial",
}

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
  photo_url: string | null;
  plan_selected: string | null;
  premium_plan: string | null;
  ratings: Ratings;
  user_id: string;
  weight_goal: WeightGoal;
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
  food_preferences: string[];
}

export interface WeightGoal {
  weight_goal_in_kg: number | null;
  created_at: string | null;
  due_date: string | null;
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
