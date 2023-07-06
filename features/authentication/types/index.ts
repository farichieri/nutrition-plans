import {
  MeasurementUnits,
  NewsletterChoices,
  PlansEnum,
  StartsOfWeek,
  SubscriptionState,
} from "@/types";

export interface UserAccount {
  bodyData: UserBodyData;
  createdAt: string | undefined;
  displayName: string;
  emailAddress: string | null;
  firstData: UserCreatedData;
  goal: UserGoals | null;
  id: string;
  imageURL: string | null;
  isAdmin: boolean;
  isPremium: boolean;
  isProfileCompleted: boolean;
  lang: string;
  measurementUnit: MeasurementUnits;
  newsletter: NewsletterChoices;
  nutritionTargets: NutritionTargets;
  planSelected: PlansEnum | null;
  ratings: Ratings;
  startOfWeek: StartsOfWeek;
  subscriptionState: SubscriptionState;
  weightGoal: WeightGoal;
  welcomeStep: UserSteps;
}
export interface UserCreatedData {
  bodyData: UserBodyData;
}

export interface UserBodyData {
  activity: UserActivities | null;
  age: number | null;
  BMI: number | null;
  BMR: number | null;
  gender: UserGenders | null;
  heightInCm: number | null;
  caloriesRecommended: number | null;
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
  foodRating: FoodRating;
}
// plans_rating: PlansRating;

export interface FoodRating {
  favorites: string[];
  likes: string[];
  dislikes: string[];
}

export interface PlansRating {
  favorites: string[];
  likes: string[];
  dislikes: string[];
}

export enum UserSteps {
  One = "step_1",
  Two = "step_2",
  Three = "step_3",
}

export enum UserGoals {
  LoseWeight = "Lose weight",
  Maintain = "Maintain",
  BuildMuscle = "Build Muscle",
}

export enum UserGenders {
  Male = "Male",
  Female = "Female",
}

export enum UserActivities {
  little_or_not_exercise = 1.2,
  light_exercise = 1.375,
  moderate_exercise = 1.55,
  very_active = 1.725,
  extra_active = 1.9,
}

// Initials:
export const newRatings: Ratings = {
  foodRating: {
    favorites: [],
    likes: [],
    dislikes: [],
  },
};
// plans_rating: {
//   favorites: [],
//   likes: [],
//   dislikes: [],
// },

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
  caloriesRecommended: null,
  waterRecommendedInLts: 0,
  weightInKg: null,
};

export const initialWeightGoal: WeightGoal = {
  weightGoalInKg: null,
  createdAt: null,
  dueDate: null,
};

export const newAccount: UserAccount = {
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
  measurementUnit: MeasurementUnits.Imperial,
  newsletter: NewsletterChoices.Yes,
  nutritionTargets: newNutritionTargets,
  planSelected: null,
  ratings: newRatings,
  startOfWeek: StartsOfWeek.Sunday,
  subscriptionState: SubscriptionState.Free,
  weightGoal: initialWeightGoal,
  welcomeStep: UserSteps.One,
};
