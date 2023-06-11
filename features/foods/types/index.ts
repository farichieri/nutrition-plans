import { PlansEnum } from "@/types";
import { NewFood } from "@/types/initialTypes";

export interface Food {
  [id: string]: any;
  allow_public: boolean;
  brand: string | null;
  compatible_plans: CompatiblePlans;
  complexity: number;
  cook_time: number;
  curated: boolean;
  date_created: any | null;
  date_updated: string | null;
  diet_id: string | null;
  diet_meal_id: string | null;
  digestion_status: DigestionStatusEnum | null;
  dish_type: DishTypesEnum | null;
  easily_single_serving: boolean;
  eaten: boolean;
  food_category: FoodCategoriesEnum | null;
  food_description: string | null;
  food_id: string | null;
  food_name_lowercase: string;
  food_name: string | null;
  food_type: FoodType;
  glucemic_status: GlucemicStatusEnum | null;
  image: string;
  index: number;
  ingredients: IngredientGroup;
  instructions: Instruction[];
  is_deleted: boolean;
  kind: FoodKind | null;
  major_ingredients: string | null;
  makes_leftovers: boolean;
  note: string;
  num_dislikes: number;
  num_favorites: number;
  num_ingredients: number;
  num_likes: number;
  nutrients: FoodNutrients;
  order: number;
  prep_time: number;
  price: number | null;
  recipe_category: RecipeCategoriesEnum | null;
  scale_amount: number;
  scale_name: string;
  scales: FoodScales;
  serving_amount_per_package: number | null;
  serving_amount: number;
  serving_grams: number;
  serving_name: string;
  source: string | null;
  total_time: number;
  uploader_id: string | null;
}

export interface FoodScale {
  is_default: boolean;
  scale_amount: number;
  scale_grams: number;
  scale_name: string;
  id: string | null;
}

export interface FoodScales extends Array<FoodScale> {}

export interface Ingredient extends Food {}

export interface IngredientGroup {
  [id: string]: Food;
}

export interface IngsGroupArray extends Array<Food> {}

export interface Instruction {
  instruction_id: string;
  order: number;
  text: string;
}

export interface FoodGroup {
  [id: string]: Food;
}

export interface FoodGroupArray extends Array<Food> {}

export interface FoodType {
  is_breakfast: boolean;
  is_dinner: boolean;
  is_lunch: boolean;
  is_snack: boolean;
}

export type CompatiblePlans = {
  [key in PlansEnum]: boolean;
};

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
  lactose = "lactose",
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
  g = "g",
  grams = "Grams",
  kcal = "kcal",
  mcg = "μg",
  mg = "mg",
  oz = "Oz",
}

export enum FoodCategoriesEnum {
  baked_products = "Baked Products",
  beef_products = "Beef Products",
  beverages = "beverages",
  cereal_grains_and_pasta = "Cereal Grains and Pasta",
  dairy_and_eggs_products = "Dairy and Eggs Products",
  fats_and_oils = "Fats and Oils",
  finfish_and_shellfish_products = "Finfish and Shellfish Products",
  fruits_and_fruit_juices = "Fruits and Fruit Juices",
  legumes_and_legume_products = "Legumes and Legume Products",
  nut_and_seed_products = "Nut and Seed Products",
  pork_products = "Pork Products",
  poultry_products = "Poultry Products",
  restaurant_foods = "Restaurant Foods",
  sausages_and_luncheon_meats = "Sausages and Luncheon Meats",
  soups_sauces_and_gravies = "Soups, Sauces, and Gravies",
  spices_and_herbs = "Spices and Herbs",
  sweets = "sweets",
  vegetables_and_vegetable_products = "Vegetables and Vegetable Products",
}

export enum RecipeCategoriesEnum {
  appetizers = "Appetizers",
  breakfast_foods = "Breakfast foods",
  desserts = "Desserts",
  drinks = "Drinks",
  mostly_meat = "Mostly meat",
  protein_shakes = "Protein Shakes",
  salads = "Salads",
  sandwiches = "Sandwiches",
  pasta = "Pasta",
  soups = "Soups",
  other = "Other",
}

export enum DishTypesEnum {
  "main_dish" = "Main Dish",
  "side_dish" = "Side Dish",
}
export enum FoodKind {
  "basic_food" = "basic_food",
  "recipe" = "recipe",
}

export enum GlucemicStatusEnum {
  low = "low",
  medium = "medium",
  high = "high",
}

export enum DigestionStatusEnum {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export type NutrientsClasified = {
  [key in NutrientsEnum]?: number | null;
};

export enum Macronutrients {
  carbohydrates = "carbohydrates",
  proteins = "proteins",
  fats = "fats",
}

export interface Recipe extends Food {}

// Initials
export const NewMeal: Recipe = NewFood;

export const InitialScale: FoodScale = {
  id: null,
  is_default: false,
  scale_amount: 1,
  scale_grams: 0,
  scale_name: "",
};
