export enum Theme {
  Dark = "dark",
  Light = "light",
}

export enum SubscriptionState {
  Free = "free",
  Premium = "premium",
}

export const MeasurementUnits = {
  metric: "metric",
  imperial: "imperial",
} as const;

export type MeasurementUnitsT = keyof typeof MeasurementUnits;

export enum WeightUnits {
  Lbs = "lbs",
  Kgs = "kgs",
}
export enum WaterUnits {
  Lts = "lts",
  FlOz = "fl oz",
}
export enum PlansEnum {
  balanced = "balanced",
  gluten_free = "gluten_free",
  mediterranean = "mediterranean",
  vegetarian = "vegetarian",
  low_carb = "low_carb",
}
export enum FiltersEnum {
  Q = "q",
  Kind = "kind",
  Plan = "plan",
  Sort = "sort",
  CaloriesRange = "caloriesRange",
  ProteinsRange = "proteinsRange",
  CarbsRange = "carbsRange",
  FatsRange = "fatsRange",
}
export enum FilterSortTypes {
  rating = "rating",
  higherCalories = "higherCalories",
  lowerCalories = "lowerCalories",
}
export enum StartsOfWeek {
  Sunday = "sunday",
  Monday = "monday",
}
export enum NewsletterChoices {
  Yes = "yes",
  No = "no",
}

// Posts
export interface Post {
  author: string;
  authorName: string;
  content: string;
  date: string;
  id: string;
  image: string;
  summary: string;
  timeReading: string;
  title: string;
  topic: string;
  isAvailable: boolean;
}
export interface Posts extends Array<Post> {}
export interface PlanType {
  author: string;
  authorName: string;
  content: string;
  date: string;
  id: string;
  image: string;
  summary: string;
  timeReading: string;
  title: string;
  topic: string;
  isAvailable: boolean;
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
  id: string;
  monthlyPrice: number;
  name: string;
  yearlyPrice: number;
}

export interface FilterQueries {
  q?: string;
  kind?: string;
  plan?: string;
  caloriesRange?: string;
  proteinsRange?: string;
  carbsRange?: string;
  fatsRange?: string;
  sort?: string;
}

export interface ImageI {
  id: string;
  imageURL: string;
  title: string;
  height?: number;
  width?: number;
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
