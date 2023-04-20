export enum Theme {
  dark = "dark",
  light = "light",
}

export enum MeasurementUnits {
  metric = "metric",
  imperial = "imperial",
}

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

export interface UserAccount {
  activity: number | null;
  age: number | null;
  BMI: number | null;
  BMR: number | null;
  created_at: string | undefined;
  display_name: string;
  email_address: string | null;
  food_preferences: string[];
  gender: string | null;
  goal: string | null;
  height_in_cm: number | null;
  is_premium: boolean;
  is_profile_completed: boolean;
  kcals_recommended: number | null;
  lang: string;
  measurement_unit: string | null;
  photo_url: string | null;
  plan_selected: string | null;
  premium_plan: string | null;
  user_id: string;
  weight_goal_in_kg: number | null;
  weight_in_kg: number | null;
}

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
