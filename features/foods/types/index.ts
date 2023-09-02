import { PlansEnum } from "@/types";

export interface Food {
  [id: string]: any;
  brand: string | null;
  category: FoodCategoriesEnum | null;
  compatiblePlans: CompatiblePlans;
  complexity: number;
  cookTime: number;
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
  isCurated: boolean;
  isEasilySingleServing: boolean;
  isEaten: boolean;
  isRecommended: boolean;
  kind: FoodKind | null;
  likes: number;
  majorIngredients: string | null;
  makesLeftovers: boolean;
  name: string | null;
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

export type FoodHit = Pick<
  Food,
  | "compatiblePlans"
  | "description"
  | "id"
  | "imageURL"
  | "ingredientsDescriptions"
  | "ingredientsNames"
  | "isCurated"
  | "kind"
  | "likes"
  | "name"
  | "nutrients"
  | "uploaderID"
  | "type"
>;

export interface FoodHitsGroup {
  [id: string]: FoodHit;
}

export interface FoodHitsGroupArray extends Array<FoodHit> {}

export interface FoodType {
  isBreakfast: boolean;
  isDinner: boolean;
  isLunch: boolean;
  isSnack: boolean;
}

export const FoodTypesEnum = {
  isBreakfast: "isBreakfast",
  isDinner: "isDinner",
  isLunch: "isLunch",
  isSnack: "isSnack",
} as const;

export type FoodTypesT = keyof typeof FoodTypesEnum;

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
  lodine = "lodine",
  lycopene = "lycopene",
  magnesium = "magnesium",
  maltose = "maltose",
  manganese = "manganese",
  monounsaturated_fats = "monounsaturated_fats",
  niacin = "niacin",
  panthotenic_acid = "panthotenic_acid",
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
  trans_fats = "trans_fats",
  vitamin_a = "vitamin_a",
  vitamin_b12 = "vitamin_b12",
  vitamin_b2_riboflavin = "vitamin_b2_riboflavin",
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
  salad_dressing_and_mayonnaise = "Salad Dressing & Mayonnaise",
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

export const DEFAULT_IMAGE = "/images/foods/default_food.png";

// Initials
// Food
export const NewFoodType: FoodType = {
  isBreakfast: false,
  isDinner: false,
  isLunch: false,
  isSnack: false,
};

export const NewFoodCompatiblePlans: CompatiblePlans = {
  balanced: false,
  gluten_free: false,
  low_carb: false,
  mediterranean: false,
  vegetarian: false,
  keto: false,
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
  lodine: null,
  lycopene: null,
  magnesium: null,
  maltose: null,
  manganese: null,
  monounsaturated_fats: null,
  niacin: null,
  panthotenic_acid: null,
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
  trans_fats: null,
  vitamin_a: null,
  vitamin_b12: null,
  vitamin_b2_riboflavin: null,
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
  brand: null,
  category: null,
  compatiblePlans: NewFoodCompatiblePlans,
  complexity: 1,
  cookTime: 0,
  dateCreated: null,
  dateUpdated: null,
  description: null,
  dietID: null,
  dietMealID: null,
  digestionStatus: null,
  dishType: null,
  dislikes: 0,
  favorites: 0,
  glucemicStatus: null,
  id: null,
  imageURL: DEFAULT_IMAGE,
  index: -1,
  ingredients: {},
  ingredientsAmount: 0,
  ingredientsDescriptions: [],
  ingredientsNames: [],
  instructions: [],
  isCurated: false,
  isEasilySingleServing: false,
  isEaten: false,
  isRecommended: false,
  kind: null,
  likes: 0,
  majorIngredients: null,
  makesLeftovers: false,
  name: null,
  note: "",
  nutrients: NewFoodNutrients,
  order: -1,
  prepTime: 0,
  price: null,
  recipeCategory: null,
  scaleAmount: 0,
  scaleName: "",
  scales: [],
  servingAmount: 1,
  servingAmountPerPackage: null,
  servingGrams: 0,
  servingName: "Serving",
  source: null,
  totalTime: 0,
  type: NewFoodType,
  uploaderID: null,
};

export let FoodKeys = {} as Food;
Object.keys(NewFood).forEach((key: string) => {
  FoodKeys[key] = key;
});
