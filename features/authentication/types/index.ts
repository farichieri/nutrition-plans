import {
  MeasurementUnitsT,
  NewsletterChoices,
  PlansEnum,
  StartsOfWeek,
} from "@/types";

export interface User {
  bodyData: UserBodyData;
  createdAt: string | undefined;
  displayName: string;
  emailAddress: string | null;
  firstData: UserCreatedData;
  goal: UserGoalsT | null;
  id: string;
  imageURL: string | null;
  isAdmin: boolean;
  isPremium: boolean;
  isProfileCompleted: boolean;
  lang: string;
  measurementUnit: MeasurementUnitsT;
  newsletter: NewsletterChoices;
  notificationsArchived: string[];
  nutritionTargets: NutritionTargets;
  planSelected: PlansEnum | null;
  ratings: Ratings;
  startOfWeek: StartsOfWeek;
  tours: Tours;
  weightGoal: WeightGoal;
  welcomeStep: UserStepsT;
  stripeId?: string;
  stripeLink?: string;
}

export interface Tours {
  createFood: boolean;
  createRecipe: boolean;
  dayPlan: boolean;
  food: boolean;
  groceries: boolean;
  library: boolean;
  profile_body: boolean;
  profile_goal: boolean;
  profile_meals: boolean;
  profile_nutrition_values: boolean;
  profile_plan: boolean;
  profile: boolean;
  progress: boolean;
  search: boolean;
  welcome: boolean;
}

export interface UserCreatedData {
  bodyData: UserBodyData;
}

export interface UserBodyData {
  activity: UserActivities | null;
  age: number | null;
  BMI: number | null;
  BMR: number | null;
  gender: UserGendersT | null;
  heightInCm: number | null;
  waterRecommendedInLts: number;
  weightInKg: number | null;
}
export interface UserFoodData {
  compatiblePlans: string[];
}

export interface WeightGoal {
  createdAt: string | null;
  dueDate: string | null;
  weightGoalInKg: number | null;
}

export interface NutritionTargets {
  calories: number | null;
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

export interface Ratings {
  foodsRating: FoodsRating;
  mealsRating: MealsRating;
  plansRating: PlansRating;
}
// plans_rating: PlansRating;

export interface FoodsRating {
  favorites: string[];
  likes: string[];
  dislikes: string[];
}

export interface PlansRating extends FoodsRating {}
export interface MealsRating extends FoodsRating {}

export interface PlansRating {
  favorites: string[];
  likes: string[];
  dislikes: string[];
}

export const UserSteps = {
  step_1: "step_1",
  step_2: "step_2",
  step_3: "step_3",
} as const;

export type UserStepsT = keyof typeof UserSteps;

export const UserGoals = {
  lose_weight: "lose_weight",
  maintain: "maintain",
  build_muscle: "build_muscle",
} as const;

export type UserGoalsT = keyof typeof UserGoals;

export const UserGenders = {
  Male: "Male",
  Female: "Female",
} as const;

export type UserGendersT = keyof typeof UserGenders;

export enum UserActivities {
  little_or_not_exercise = 1.2,
  light_exercise = 1.375,
  moderate_exercise = 1.55,
  very_active = 1.725,
  extra_active = 1.9,
}

// Initials:
export const newRatings: Ratings = {
  foodsRating: {
    favorites: [],
    likes: [],
    dislikes: [],
  },
  mealsRating: {
    favorites: [],
    likes: [],
    dislikes: [],
  },
  plansRating: {
    favorites: [],
    likes: [],
    dislikes: [],
  },
};

export const newNutritionTargets: NutritionTargets = {
  calories: null,
  carbohydrates: {
    min: null,
    max: null,
  },
  proteins: {
    min: null,
    max: null,
  },
  fats: {
    min: null,
    max: null,
  },
};

export const newBodyData: UserBodyData = {
  activity: null,
  age: null,
  BMI: null,
  BMR: null,
  gender: null,
  heightInCm: null,
  waterRecommendedInLts: 0,
  weightInKg: null,
};

export const initialWeightGoal: WeightGoal = {
  weightGoalInKg: null,
  createdAt: null,
  dueDate: null,
};

export const newAccount: User = {
  bodyData: newBodyData,
  createdAt: "",
  displayName: "",
  emailAddress: "",
  firstData: {
    bodyData: newBodyData,
  },
  goal: null,
  id: "",
  imageURL: "",
  isAdmin: false,
  isPremium: false,
  isProfileCompleted: false,
  lang: "en",
  measurementUnit: "imperial",
  newsletter: NewsletterChoices.Yes,
  nutritionTargets: newNutritionTargets,
  planSelected: null,
  ratings: newRatings,
  startOfWeek: StartsOfWeek.Sunday,
  weightGoal: initialWeightGoal,
  welcomeStep: UserSteps.step_1,
  notificationsArchived: [],
  tours: {
    createFood: false,
    createRecipe: false,
    dayPlan: false,
    food: false,
    groceries: false,
    library: false,
    profile_body: false,
    profile_goal: false,
    profile_meals: false,
    profile_nutrition_values: false,
    profile_plan: false,
    profile: false,
    progress: false,
    search: false,
    welcome: false,
  },
};
