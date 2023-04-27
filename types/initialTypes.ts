import {
  Food,
  FoodImages,
  FoodNutrients,
  FoodType,
  FoodWeights,
} from "@/types/foodTypes";
import {
  Progress,
  UserAccount,
  UserBodyData,
  UserFoodData,
  WeightGoal,
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

export const initialWeightGoal: WeightGoal = {
  weight_goal_in_kg: null,
  created_at: null,
  due_date: null,
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
  weight_goal: initialWeightGoal,
  first_data: {
    body_data: newBodyData,
    food_data: newFoodData,
  },
};

export const newProgress: Progress = {};

// Food
export const NewFoodType: FoodType = {
  is_basic_food: false,
  is_breakfast: false,
  is_dinner: false,
  is_lunch: false,
  is_recipe: false,
  is_snack: false,
};
export const NewFoodImages: FoodImages = {
  curated: false,
  food_id: "",
  image_id: "",
  image: "",
  is_primary_image: false,
  source: "",
  uploader: "",
};
export const NewFoodWeights: FoodWeights = {
  amount: 0,
  description: "",
  grams: 0,
};

export const NewFoodNutrients: FoodNutrients = {
  betaine: null,
  caffeine: null,
  calcium: null,
  calories: null,
  carbohydrates: null,
  cholesterol: null,
  choline: null,
  copper: null,
  fats: null,
  fiber: null,
  fluoride: null,
  folate: null,
  fructose: null,
  galactose: null,
  glucose: null,
  iron: null,
  lactose: null,
  lycopene: null,
  magnesium: null,
  maltose: null,
  manganese: null,
  monounsaturated_fats: null,
  niacin: null,
  phosphorus: null,
  polyunsaturated_fats: null,
  potassium: null,
  proteins: null,
  retinol: null,
  saturated_fats: null,
  selenium: null,
  sodium: null,
  sucrose: null,
  sugar: null,
  thiamine: null,
  total_omega_3: null,
  total_omega_6: null,
  trans_fats: null,
  vitamin_a: null,
  vitamin_b12: null,
  vitamin_b2: null,
  vitamin_b6: null,
  vitamin_c: null,
  vitamin_d: null,
  vitamin_d2: null,
  vitamin_d3: null,
  vitamin_e: null,
  vitamin_k: null,
  water: null,
  zinc: null,
};

export const NewFood: Food = {
  allow_public: true,
  cook_time: null,
  date_created: null,
  date_updated: null,
  food_category: null,
  food_description: null,
  food_id: null,
  food_name: null,
  images: [],
  is_deleted: false,
  major_ingredients: null,
  manufactured_by: null,
  num_favorites: 0,
  num_ingredient_usages: 0,
  nutrients: NewFoodNutrients,
  price: null,
  serving_amount_per_package: 1,
  serving_amount: 1,
  serving_grams: null,
  serving_name: "serving",
  source: null,
  type: NewFoodType,
  uploader: null,
  user_id: null,
  weights: [],
};
