import { PlansEnum } from "@/types";

export interface Food {
  [id: string]: any;
  brand: string | null;
  category: FoodCategoriesValues | null;
  compatiblePlans: CompatiblePlans;
  complexity: number;
  cookTime: number;
  dateCreated: any | null;
  dateUpdated: string | null;
  description: string;
  dietID: string | null;
  dietMealID: string | null;
  digestionStatus: DigestionStatusEnum | null;
  dishType: DishTypesEnum | null;
  dislikes: number;
  favorites: number;
  fdcId: number | null;
  glucemicStatus: GlucemicStatusEnum | null;
  id: string | null;
  imageURL: string;
  imageURLs: ImageURLs;
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
  nutrients: NutrientsT;
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

export interface ImageURLs {
  resized_100x100: string;
  resized_1200x900: string;
  resized_680x680: string;
  resized_200x200: string;
  resized_400x400: string;
}

export interface FoodScale {
  id: string | number | null;
  isCreationScale: boolean;
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

export const Nutrients = {
  betaine: "betaine",
  biotin: "biotin",
  caffeine: "caffeine",
  calcium: "calcium",
  calories: "calories",
  carbohydrates: "carbohydrates",
  cholesterol: "cholesterol",
  choline: "choline",
  copper: "copper",
  fats: "fats",
  fiber: "fiber",
  fluoride: "fluoride",
  folate: "folate",
  fructose: "fructose",
  galactose: "galactose",
  glucose: "glucose",
  glutamic_acid: "glutamic_acid",
  iodine: "iodine",
  iron: "iron",
  isoleucine: "isoleucine",
  lactose: "lactose",
  leucine: "leucine",
  lycopene: "lycopene",
  lysine: "lysine",
  magnesium: "magnesium",
  maltose: "maltose",
  manganese: "manganese",
  methionine: "methionine",
  monounsaturated_fats: "monounsaturated_fats",
  niacin: "niacin",
  panthotenic_acid: "panthotenic_acid",
  phenylalanine: "phenylalanine",
  phosphorus: "phosphorus",
  polyunsaturated_fats: "polyunsaturated_fats",
  potassium: "potassium",
  proteins: "proteins",
  retinol: "retinol",
  riboflavin: "riboflavin",
  saturated_fats: "saturated_fats",
  selenium: "selenium",
  sodium: "sodium",
  sucrose: "sucrose",
  sugar: "sugar",
  thiamine: "thiamine",
  threonine: "threonine",
  trans_fats: "trans_fats",
  trypthophan: "trypthophan",
  valine: "valine",
  vitamin_a: "vitamin_a",
  vitamin_b12: "vitamin_b12",
  vitamin_b6: "vitamin_b6",
  vitamin_c: "vitamin_c",
  vitamin_d: "vitamin_d",
  vitamin_d2: "vitamin_d2",
  vitamin_d3: "vitamin_d3",
  vitamin_e: "vitamin_e",
  vitamin_k: "vitamin_k",
  water: "water",
  zinc: "zinc",
} as const;

export type NutrientsKeys = keyof typeof Nutrients;

export type NutrientsT = {
  [key in NutrientsKeys]: number | null;
};

export const NutrientsAbbreviations = {
  betaine: "",
  biotin: "",
  caffeine: "",
  calcium: "Ca",
  calories: "",
  carbohydrates: "",
  cholesterol: "",
  choline: "",
  copper: "Cu",
  fats: "",
  fiber: "",
  fluoride: "F",
  folate: "Fol",
  fructose: "",
  galactose: "",
  glucose: "",
  glutamic_acid: "",
  iodine: "I",
  iron: "Fe",
  isoleucine: "",
  lactose: "",
  leucine: "",
  lycopene: "",
  lysine: "",
  magnesium: "Mg",
  maltose: "",
  manganese: "Mn",
  methionine: "",
  monounsaturated_fats: "",
  niacin: "Niac",
  panthotenic_acid: "",
  phenylalanine: "",
  phosphorus: "P",
  polyunsaturated_fats: "",
  potassium: "K",
  proteins: "",
  retinol: "",
  riboflavin: "Rib",
  saturated_fats: "",
  selenium: "Se",
  sodium: "Na",
  sucrose: "",
  sugar: "",
  thiamine: "Thi",
  threonine: "",
  trans_fats: "",
  trypthophan: "",
  valine: "",
  vitamin_a: "",
  vitamin_b12: "",
  vitamin_b6: "",
  vitamin_c: "",
  vitamin_d: "",
  vitamin_d2: "",
  vitamin_d3: "",
  vitamin_e: "",
  vitamin_k: "",
  water: "",
  zinc: "Zn",
} as const;

export enum NutritionMeasurements {
  g = "g",
  grams = "Grams",
  kcal = "kcal",
  mcg = "μg",
  mg = "mg",
  oz = "Oz",
}

export const FoodCategories = {
  alcoholic_beverages: "Alcoholic Beverages",
  baked_products: "Baked Products",
  beef_products: "Beef Products",
  beverages: "Beverages",
  branded_food_products_database: "Branded Food Products Database",
  breakfast_cereals: "Breakfast Cereals",
  cereal_grains_and_pasta: "Cereal Grains and Pasta",
  dairy_and_eggs_products: "Dairy and Eggs Products",
  fast_foods: "Fast Foods",
  fats_and_oils: "Fats and Oils",
  finfish_and_shellfish_products: "Finfish and Shellfish Products",
  fruits_and_fruit_juices: "Fruits and Fruit Juices",
  lamb_veal_and_game_products: "Lamb, Veal, and Game Products",
  legumes_and_legume_products: "Legumes and Legume Products",
  meals_entrees_and_side_dishes: "Meals, Entrees, and Side Dishes",
  nut_and_seed_products: "Nut and Seed Products",
  pork_products: "Pork Products",
  poultry_products: "Poultry Products",
  restaurant_foods: "Restaurant Foods",
  salad_dressing_and_mayonnaise: "Salad Dressing & Mayonnaise",
  sausages_and_luncheon_meats: "Sausages and Luncheon Meats",
  snacks: "Snacks",
  soups_sauces_and_gravies: "Soups, Sauces, and Gravies",
  spices_and_herbs: "Spices and Herbs",
  sweets: "Sweets",
  vegetables_and_vegetable_products: "Vegetables and Vegetable Products",
} as const;

export type FoodCategoriesKeys = keyof typeof FoodCategories;

export type FoodCategoriesValues = (typeof FoodCategories)[FoodCategoriesKeys];

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
  [key in NutrientsKeys]?: number | null;
};

export enum Macronutrients {
  carbohydrates = "carbohydrates",
  proteins = "proteins",
  fats = "fats",
}

export interface Recipe extends Food {}

export const InitialScale: FoodScale = {
  id: null,
  isCreationScale: false,
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

export const NewNutrients: NutrientsT = {
  betaine: null,
  biotin: null,
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
  iodine: null,
  iron: null,
  lactose: null,
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
  riboflavin: null,
  vitamin_b6: null,
  vitamin_c: null,
  vitamin_d: null,
  vitamin_d2: null,
  vitamin_d3: null,
  vitamin_e: null,
  vitamin_k: null,
  water: null,
  zinc: null,
  isoleucine: null,
  leucine: null,
  lysine: null,
  methionine: null,
  phenylalanine: null,
  threonine: null,
  trypthophan: null,
  valine: null,
  glutamic_acid: null,
};

export const NewFood: Food = {
  brand: null,
  category: null,
  compatiblePlans: NewFoodCompatiblePlans,
  complexity: 1,
  cookTime: 0,
  dateCreated: null,
  dateUpdated: null,
  description: "",
  dietID: null,
  dietMealID: null,
  digestionStatus: null,
  dishType: null,
  dislikes: 0,
  favorites: 0,
  fdcId: null,
  glucemicStatus: null,
  id: null,
  imageURL: DEFAULT_IMAGE,
  imageURLs: {
    resized_100x100: DEFAULT_IMAGE,
    resized_1200x900: DEFAULT_IMAGE,
    resized_200x200: DEFAULT_IMAGE,
    resized_400x400: DEFAULT_IMAGE,
    resized_680x680: DEFAULT_IMAGE,
  },
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
  nutrients: NewNutrients,
  order: -1,
  prepTime: 0,
  price: null,
  recipeCategory: null,
  scaleAmount: 0,
  scaleName: "",
  scales: [
    {
      id: "creationScale",
      isCreationScale: true,
      isDefault: true,
      scaleAmount: 1,
      scaleGrams: 0,
      scaleName: "Serving",
    },
  ],
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
