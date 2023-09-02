import { Nutrients } from "@/features/foods/types";

// General
const caffeine = Nutrients.caffeine;
const cholesterol = Nutrients.cholesterol;
const fiber = Nutrients.fiber;
const sodium = Nutrients.sodium;

const firstNutritionFields = [caffeine, fiber, sodium, cholesterol];

// Sugars
const sugar = Nutrients.sugar;
const fructose = Nutrients.fructose;
const galactose = Nutrients.galactose;
const glucose = Nutrients.glucose;
const lactose = Nutrients.lactose;
const maltose = Nutrients.maltose;
const sucrose = Nutrients.sucrose;

const sugarNutritionFields = [
  sugar,
  fructose,
  galactose,
  glucose,
  lactose,
  maltose,
  sucrose,
];

// Fats
const saturated_fats = Nutrients.saturated_fats;
const monounsaturated_fats = Nutrients.monounsaturated_fats;
const polyunsaturated_fats = Nutrients.polyunsaturated_fats;
const trans_fats = Nutrients.trans_fats;

const fatsNutritionFields = [
  saturated_fats,
  monounsaturated_fats,
  polyunsaturated_fats,
  trans_fats,
];

// Vitamins and Minerals
const betaine = Nutrients.betaine;
const biotin = Nutrients.biotin;
const calcium = Nutrients.calcium;
const choline = Nutrients.choline;
const copper = Nutrients.copper;
const fluoride = Nutrients.fluoride;
const folate = Nutrients.folate;
const iodine = Nutrients.iodine;
const iron = Nutrients.iron;
const lycopene = Nutrients.lycopene;
const magnesium = Nutrients.magnesium;
const manganese = Nutrients.manganese;
const niacin = Nutrients.niacin;
const panthotenic_acid = Nutrients.panthotenic_acid;
const phosphorus = Nutrients.phosphorus;
const potassium = Nutrients.potassium;
const retinol = Nutrients.retinol;
const selenium = Nutrients.selenium;
const thiamine = Nutrients.thiamine;
const vitamin_a = Nutrients.vitamin_a;
const vitamin_b12 = Nutrients.vitamin_b12;
const vitamin_b2_riboflavin = Nutrients.vitamin_b2_riboflavin;
const vitamin_b6 = Nutrients.vitamin_b6;
const vitamin_c = Nutrients.vitamin_c;
const vitamin_d = Nutrients.vitamin_d;
const vitamin_d2 = Nutrients.vitamin_d2;
const vitamin_d3 = Nutrients.vitamin_d3;
const vitamin_e = Nutrients.vitamin_e;
const vitamin_k = Nutrients.vitamin_k;
const zinc = Nutrients.zinc;

const vitsAndMinsNutritionFields = [
  betaine,
  biotin,
  calcium,
  choline,
  copper,
  fluoride,
  folate,
  iodine,
  iron,
  lycopene,
  magnesium,
  manganese,
  niacin,
  panthotenic_acid,
  phosphorus,
  potassium,
  retinol,
  selenium,
  thiamine,
  vitamin_a,
  vitamin_b12,
  vitamin_b2_riboflavin,
  vitamin_b6,
  vitamin_c,
  vitamin_d,
  vitamin_d2,
  vitamin_d3,
  vitamin_e,
  vitamin_k,
  zinc,
];

export {
  fatsNutritionFields,
  firstNutritionFields,
  sugarNutritionFields,
  vitsAndMinsNutritionFields,
};
