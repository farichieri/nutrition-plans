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
  activity: string | null;
  age: number | null;
  created_at: string | undefined;
  display_name: string;
  email_address: string | null;
  gender: string | null;
  height: string | null;
  is_premium: boolean;
  lang: string;
  measurement_unit: string | null;
  photo_url: string | null;
  plan_selected: string | null;
  premium_plan: string | null;
  user_goal: string | null;
  user_id: string;
  weight_goal: string | null;
  weight: string | null;
  BMR: number | null;
  kcals_reccomended: number | null;
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
