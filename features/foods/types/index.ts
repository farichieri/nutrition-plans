import { PlansEnum } from "@/types";

export interface Food {
  [id: string]: any;
  brand: string | null;
  category: FoodCategoriesEnum | null;
  compatiblePlans: CompatiblePlans;
  complexity: number;
  cookTime: number;
  isCurated: boolean;
  dateCreated: any | null;
  dateUpdated: string | null;
  description: string | null;
  dietID: string | null;
  dietMealID: string | null;
  digestionStatus: DigestionStatusEnum | null;
  dishType: DishTypesEnum | null;
  dislikes: number;
  favorites: number;
  glucemicStatus: GlucemicStatusEnum | null;
  id: string | null;
  imageURL: string;
  index: number;
  ingredients: IngredientGroup;
  ingredientsAmount: number;
  ingredientsDescriptions: string[];
  ingredientsNames: string[];
  instructions: Instruction[];
  isAllowPublic: boolean;
  isDeleted: boolean;
  isEasilySingleServing: boolean;
  isEaten: boolean;
  isRecommended: boolean;
  kind: FoodKind | null;
  likes: number;
  majorIngredients: string | null;
  makesLeftovers: boolean;
  name: string | null;
  nameLowerCase: string;
  note: string;
  nutrients: FoodNutrients;
  order: number;
  prepTime: number;
  price: number | null;
  recipeCategory: RecipeCategoriesEnum | null;
  scaleAmount: number;
  scaleName: string;
  scales: FoodScales;
  servingAmount: number;
  servingAmountPerPackage: number | null;
  servingGrams: number;
  servingName: string;
  source: string | null;
  totalTime: number;
  type: FoodType;
  uploaderID: string | null;
}

export interface FoodScale {
  id: string | null;
  isDefault: boolean;
  scaleAmount: number;
  scaleGrams: number;
  scaleName: string;
}

export interface FoodScales extends Array<FoodScale> {}

export interface Ingredient extends Food {}

export interface IngredientGroup {
  [id: string]: Food;
}

export interface IngsGroupArray extends Array<Food> {}

export interface Instruction {
  id: string;
  order: number;
  text: string;
}

export interface FoodGroup {
  [id: string]: Food;
}

export interface FoodGroupArray extends Array<Food> {}

export interface FoodType {
  isBreakfast: boolean;
  isDinner: boolean;
  isLunch: boolean;
  isSnack: boolean;
}

export enum FoodTypesEnum {
  isBreakfast = "isBreakfast",
  isDinner = "isDinner",
  isLunch = "isLunch",
  isSnack = "isSnack",
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
  beverages = "Beverages",
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
  sweets = "Sweets",
  vegetables_and_vegetable_products = "Vegetables and Vegetable Products",
}

export enum RecipeCategoriesEnum {
  appetizers = "Appetizers",
  breakfast_foods = "Breakfast foods",
  desserts = "Desserts",
  drinks = "Drinks",
  mostly_meat = "Mostly meat",
  other = "Other",
  pasta = "Pasta",
  protein_shakes = "Protein Shakes",
  salads = "Salads",
  sandwiches = "Sandwiches",
  soups = "Soups",
}

export enum DishTypesEnum {
  "main_dish" = "Main Dish",
  "side_dish" = "Side Dish",
}
export enum FoodKind {
  "basic_food" = "basic_food",
  "recipe" = "recipe",
}
// "vitamin" = "vitamin",
// "supplement" = "supplement"

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

export const InitialScale: FoodScale = {
  id: null,
  isDefault: false,
  scaleAmount: 1,
  scaleGrams: 0,
  scaleName: "",
};
