export interface Food {
  [id: string]: any;
  allow_public: boolean;
  cook_time: number | null;
  date_created: string | null;
  date_updated: string | null;
  food_description: string | null;
  food_id: string | null;
  food_name: string | null;
  images: FoodImages[];
  is_deleted: boolean;
  major_ingredients: string | null;
  manufactured_by: string | null;
  num_favorites: number;
  num_ingredient_usages: number;
  nut_calories: number | null;
  nut_carbohydrates: number | null;
  nut_cholesterol: number | null;
  nut_fats: number | null;
  nut_fiber: number | null;
  nut_net_carbs: number | null;
  nut_proteins: number | null;
  nutrients: FoodNutrients;
  price: number | null;
  serving_amount_per_package: number | null;
  serving_amount: number | null;
  serving_grams: number | null;
  serving_name: string | null;
  source: string | null;
  type: FoodType;
  uploader: string | null;
  user_id: string | null;
  weights: FoodWeights[];
}

export interface FoodWeights {
  amount: number;
  description: string;
  grams: number;
}

export interface FoodImages {
  curated: boolean;
  food_id: string;
  image_id: string;
  image: string;
  is_primary_image: boolean;
  source: string;
  uploader: string;
}

export interface FoodType {
  is_basic_food: boolean;
  is_breakfast: boolean;
  is_dinner: boolean;
  is_lunch: boolean;
  is_recipe: boolean;
  is_snack: boolean;
}

export enum NutrientsEnum {
  betaine = "betaine",
  caffeine = "caffeine",
  calcium = "calcium",
  calories = "calories",
  carbohydrates = "carbohydrates",
  cholesterol = "cholesterol",
  choline = "choline",
  copper = "copper",
  fats = "fats",
  fiber = "fiber",
  fluoride = "fluoride",
  folate = "folate",
  fructose = "fructose",
  galactose = "galactose",
  glucose = "glucose",
  iron = "iron",
  lycopene = "lycopene",
  magnesium = "magnesium",
  maltose = "maltose",
  manganese = "manganese",
  monounsaturated_fats = "monounsaturated_fats",
  niacin = "niacin",
  phosphorus = "phosphorus",
  polyunsaturated_fats = "polyunsaturated_fats",
  potassium = "potassium",
  proteins = "proteins",
  retinol = "retinol",
  saturated_fats = "saturated_fats",
  selenium = "selenium",
  sodium = "sodium",
  sucrose = "sucrose",
  sugar = "sugar",
  thiamine = "thiamine",
  total_omega_3 = "total_omega_3",
  total_omega_6 = "total_omega_6",
  trans_fats = "trans_fats",
  vitamin_a = "vitamin_a",
  vitamin_b12 = "vitamin_b12",
  vitamin_b2 = "vitamin_b2",
  vitamin_b6 = "vitamin_b6",
  vitamin_c = "vitamin_c",
  vitamin_d = "vitamin_d",
  vitamin_d2 = "vitamin_d2",
  vitamin_d3 = "vitamin_d3",
  vitamin_e = "vitamin_e",
  vitamin_k = "vitamin_k",
  water = "water",
  zinc = "zinc",
}

export type FoodNutrients = {
  [key in NutrientsEnum]: number | null;
};

export enum NutritionMeasurements {
  mcg = "μg",
  mg = "mg",
  g = "g",
}
