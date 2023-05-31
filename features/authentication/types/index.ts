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
  nutrition_targets: NutritionTargets;
  photo_url: string | null;
  plan_selected: string | null;
  premium_plan: string | null;
  ratings: Ratings;
  user_id: string;
  weight_goal: WeightGoal;
  user_step: UserSteps;
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
  compatible_plans: string[];
}

export interface WeightGoal {
  weight_goal_in_kg: number | null;
  created_at: string | null;
  due_date: string | null;
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

export interface FoodRating {
  favorites: string[];
  likes: string[];
  dislikes: string[];
}

export enum UserSteps {
  step_1 = "step_1",
  step_2 = "step_2",
  step_3 = "step_3",
}
