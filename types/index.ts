export enum Theme {
  Dark = "dark",
  Light = "light",
  System = "system",
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
  keto = "keto",
}
export enum FiltersEnum {
  CaloriesRange = "caloriesRange",
  CarbsRange = "carbsRange",
  Category = "category",
  FatsRange = "fatsRange",
  Kind = "kind",
  Plan = "plan",
  ProteinsRange = "proteinsRange",
  Q = "q",
  Sort = "sort",
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
  description: string;
  id: string;
  image: string;
  imageURL: string;
  isAvailable: boolean;
  timeReading: string;
  title: string;
  topic: string;
  keywords: string[];
  URL: string;
}
export interface Posts extends Array<Post> {}
export interface PlanType {
  author: string;
  authorName: string;
  content: string;
  date: string;
  description: string;
  id: string;
  image: string;
  imageURL: string;
  isAvailable: boolean;
  timeReading: string;
  title: string;
  topic: string;
  keywords: string[];
  URL: string;
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
  id: string;
  name: string;
  beta: boolean;
  prices: {
    monthly: Price;
    yearly: Price;
    semestry: Price;
  };
}

export interface Price {
  id: string;
  name: string;
  price: number;
  discount: string;
  discountPrice: number;
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
  category?: string;
  page?: string;
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

type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

export class BaseError extends Error {
  public readonly context?: Jsonable;

  constructor(
    message: string,
    options: { error?: Error; context?: Jsonable; cause?: Error } = {}
  ) {
    const { cause, context } = options;

    super(message, { cause });
    this.name = this.constructor.name;

    this.context = context;
  }
}
