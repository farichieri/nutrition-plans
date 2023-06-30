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
export enum WeightUnits {
  lbs = "lbs",
  kgs = "kgs",
}
export enum WaterUnits {
  lts = "lts",
  floz = "fl oz",
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
export enum StartsOfWeek {
  sunday = "sunday",
  monday = "monday",
}
export enum NewsletterChoices {
  "yes" = "yes",
  "no" = "no",
}

// Posts
export interface Post {
  author: string;
  authorName: string;
  content: string;
  date: string;
  id: string;
  summary: string;
  title: string;
  topic: string;
  image: string;
  timeReading: string;
}
export interface Posts extends Array<Post> {}
export interface PlanType {
  content: string;
  id: string;
  title: string;
  image: string;
}
export interface PlansType extends Array<PlanType> {}

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

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export type Result<T, E> =
  | { result: "success"; data: T }
  | { result: "error"; error: E };

export type Options = { text: string; value: string }[];
