import {
  Food,
  FoodNutrients,
  CompatiblePlans,
  FoodType,
  Ingredient,
} from "@/types/foodTypes";
import {
  MealsEnum,
  NutritionTargets,
  Progress,
  Ratings,
  SubscriptionState,
  UserAccount,
  UserBodyData,
  UserFoodData,
  UserSteps,
  WeightGoal,
} from "@/types/types";

export const DEFAULT_IMAGE = "/images/foods/default_food.png";

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
  compatible_plans: [],
};

export const newRagins: Ratings = {
  food_rating: {
    favorites: [],
    likes: [],
    dislikes: [],
  },
};

export const newNutritionTargets: NutritionTargets = {
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

export const newAccount: UserAccount = {
  body_data: newBodyData,
  created_at: "",
  display_name: "",
  email_address: "",
  food_data: newFoodData,
  is_admin: false,
  is_premium: false,
  num_meals: 4,
  user_meals: [
    MealsEnum.breakfast,
    MealsEnum.lunch,
    MealsEnum.dinner,
    MealsEnum.snack,
  ],
  is_profile_completed: false,
  lang: "",
  nutrition_targets: newNutritionTargets,
  photo_url: "",
  plan_selected: null,
  premium_plan: SubscriptionState.free,
  ratings: newRagins,
  user_id: "",
  user_step: UserSteps.step_1,
  weight_goal: initialWeightGoal,
  first_data: {
    body_data: newBodyData,
    food_data: newFoodData,
  },
};

export const newProgress: Progress = {};

// Food
export const NewFoodType: FoodType = {
  is_breakfast: false,
  is_dinner: false,
  is_lunch: false,
  is_snack: false,
};
export const NewFoodCompatiblePlans: CompatiblePlans = {
  is_balanced: false,
  is_gluten_free: false,
  is_ketogenic: false,
  is_low_carb: false,
  is_mediterranean: false,
  is_vegetarian: false,
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
  compatible_plans: NewFoodCompatiblePlans,
  cook_time: null,
  date_created: null,
  date_updated: null,
  digestion_status: null,
  dish_type: null,
  easily_single_serving: false,
  food_category: null,
  food_description: null,
  food_id: null,
  food_name_lowercase: null,
  food_name: null,
  food_type: NewFoodType,
  glucemic_status: null,
  image: DEFAULT_IMAGE,
  ingredients: {},
  instructions: [],
  is_deleted: false,
  kind: null,
  major_ingredients: null,
  makes_leftovers: false,
  manufactured_by: null,
  num_dislikes: 0,
  num_favorites: 0,
  num_ingredient_usages: 0,
  num_likes: 0,
  nutrients: NewFoodNutrients,
  order: null,
  prep_time: null,
  price: null,
  recipe_category: null,
  scale_amount: null,
  scale_name: null,
  serving_amount_per_package: 1,
  serving_amount: 1,
  serving_grams: null,
  serving_name: "serving",
  source: null,
  uploader: null,
  user_id: null,
};

export const NewIngredient: Ingredient = {
  food_id: "",
  food: NewFood,
  order: 0,
  text: "",
};
