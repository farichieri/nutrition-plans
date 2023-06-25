import { MeasurementUnits, PlansEnum, SubscriptionState } from "@/types";

export interface UserAccount {
  body_data: UserBodyData;
  created_at: string | undefined;
  display_name: string;
  email_address: string | null;
  first_data: UserCreatedData;
  goal: UserGoals | null;
  is_admin: boolean;
  is_premium: boolean;
  is_profile_completed: boolean;
  lang: string;
  measurement_unit: MeasurementUnits;
  nutrition_targets: NutritionTargets;
  photo_url: string | null;
  plan_selected: PlansEnum | null;
  premium_plan: string | null;
  ratings: Ratings;
  user_id: string;
  user_step: UserSteps;
  weight_goal: WeightGoal;
}
export interface UserCreatedData {
  body_data: UserBodyData;
}

export interface UserBodyData {
  activity: UserActivities | null;
  age: number | null;
  BMI: number | null;
  BMR: number | null;
  gender: UserGenders | null;
  height_in_cm: number | null;
  kcals_recommended: number | null;
  water_lts_recommended: number;
  weight_in_kg: number | null;
}
export interface UserFoodData {
  compatible_plans: string[];
}

export interface WeightGoal {
  created_at: string | null;
  due_date: string | null;
  weight_goal_in_kg: number | null;
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
  food_rating: FoodRating;
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
  step_1 = "step_1",
  step_2 = "step_2",
  step_3 = "step_3",
}

export enum UserGoals {
  lose_weight = "Lose weight",
  maintain = "Maintain",
  build_muscle = "Build Muscle",
}

export enum UserGenders {
  male = "Male",
  female = "Female",
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
  food_rating: {
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
  height_in_cm: null,
  kcals_recommended: null,
  water_lts_recommended: 0,
  weight_in_kg: null,
};

export const initialWeightGoal: WeightGoal = {
  weight_goal_in_kg: null,
  created_at: null,
  due_date: null,
};

export const newAccount: UserAccount = {
  body_data: newBodyData,
  created_at: "",
  display_name: "",
  email_address: "",
  goal: null,
  is_admin: false,
  is_premium: false,
  is_profile_completed: false,
  lang: "en",
  nutrition_targets: newNutritionTargets,
  photo_url: "",
  plan_selected: null,
  premium_plan: SubscriptionState.free,
  ratings: newRatings,
  measurement_unit: MeasurementUnits.imperial,
  user_id: "",
  user_step: UserSteps.step_1,
  weight_goal: initialWeightGoal,
  first_data: {
    body_data: newBodyData,
  },
};
