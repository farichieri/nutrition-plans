import { NutrientsEnum } from "@/features/foods/types";

let nutrientKeys: any = {};
Object.keys(NutrientsEnum).forEach((key) => {
  nutrientKeys[key] = key;
});

const cholesterol = nutrientKeys.cholesterol;
const fiber = nutrientKeys.fiber;
const potassium = nutrientKeys.potassium;
const sodium = nutrientKeys.sodium;

const firstNutritionFields = [cholesterol, fiber, potassium, sodium];

const sugar = nutrientKeys.sugar;
const fructose = nutrientKeys.fructose;
const galactose = nutrientKeys.galactose;
const glucose = nutrientKeys.glucose;
const lactose = nutrientKeys.lactose;
const maltose = nutrientKeys.maltose;
const sucrose = nutrientKeys.sucrose;

const sugarNutritionFields = [
  sugar,
  fructose,
  galactose,
  glucose,
  lactose,
  maltose,
  sucrose,
];

const saturated_fats = nutrientKeys.saturated_fats;
const monounsaturated_fats = nutrientKeys.monounsaturated_fats;
const polyunsaturated_fats = nutrientKeys.polyunsaturated_fats;
const trans_fats = nutrientKeys.trans_fats;

const fatsNutritionFields = [
  saturated_fats,
  monounsaturated_fats,
  polyunsaturated_fats,
  trans_fats,
];

const betaine = nutrientKeys.betaine;
const caffeine = nutrientKeys.caffeine;
const calcium = nutrientKeys.calcium;
const choline = nutrientKeys.choline;
const copper = nutrientKeys.copper;
const fluoride = nutrientKeys.fluoride;
const folate = nutrientKeys.folate;
const iron = nutrientKeys.iron;
const lycopene = nutrientKeys.lycopene;
const magnesium = nutrientKeys.magnesium;
const manganese = nutrientKeys.manganese;
const niacin = nutrientKeys.niacin;
const phosphorus = nutrientKeys.phosphorus;
const retinol = nutrientKeys.retinol;
const selenium = nutrientKeys.selenium;
const thiamine = nutrientKeys.thiamine;
const vitamin_a = nutrientKeys.vitamin_a;
const vitamin_b12 = nutrientKeys.vitamin_b12;
const vitamin_b6 = nutrientKeys.vitamin_b6;
const vitamin_c = nutrientKeys.vitamin_c;
const vitamin_d = nutrientKeys.vitamin_d;
const vitamin_d2 = nutrientKeys.vitamin_d2;
const vitamin_d3 = nutrientKeys.vitamin_d3;
const vitamin_e = nutrientKeys.vitamin_e;
const vitamin_k = nutrientKeys.vitamin_k;
const zinc = nutrientKeys.zinc;
const lodine = nutrientKeys.lodine;

const vitsAndMinsNutritionFields = [
  betaine,
  caffeine,
  calcium,
  choline,
  copper,
  fluoride,
  folate,
  iron,
  lodine,
  lycopene,
  magnesium,
  manganese,
  niacin,
  phosphorus,
  retinol,
  selenium,
  thiamine,
  vitamin_a,
  vitamin_b12,
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
