import {
  Progress,
  UserAccount,
  UserBodyData,
  UserFoodData,
} from "@/types/types";

export const newBodyData: UserBodyData = {
  activity: null,
  age: null,
  BMI: null,
  BMR: null,
  gender: null,
  goal: null,
  height_in_cm: null,
  kcals_recommended: null,
  measurement_unit: null,
  weight_in_kg: null,
};

export const newFoodData: UserFoodData = {
  food_preferences: [],
};

export const newAccount: UserAccount = {
  body_data: newBodyData,
  created_at: "",
  display_name: "",
  email_address: "",
  food_data: newFoodData,
  is_premium: false,
  is_profile_completed: false,
  lang: "",
  photo_url: "",
  plan_selected: null,
  premium_plan: null,
  user_id: "",
  weight_goal_in_kg: null,
  first_data: {
    body_data: newBodyData,
    food_data: newFoodData,
  },
};

export const newProgress: Progress = {};
