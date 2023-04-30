import {
  FoodCategoriesEnum,
  GlucemicStatusEnum,
  NutrientsEnum,
} from "@/types/foodTypes";
import { NewFood } from "@/types/initialTypes";

let foodKeys: any = {};
Object.keys(NewFood).forEach((key) => {
  foodKeys[key] = key;
});

let nutrientKeys: any = {};
Object.keys(NutrientsEnum).forEach((key) => {
  nutrientKeys[key] = key;
});

let foodCategoriesKeys: any = Object.keys(FoodCategoriesEnum);
let foodGlucemicStatusKeys: any = Object.keys(GlucemicStatusEnum);

const calories = nutrientKeys.calories;
const carbohydrates = nutrientKeys.carbohydrates;
const fats = nutrientKeys.fats;
const food_description = foodKeys.food_description;
const food_name = foodKeys.food_name;
const price = foodKeys.price;
const proteins = nutrientKeys.proteins;
const serving_amount = foodKeys.serving_amount;
const serving_amount_per_package = foodKeys.serving_amount_per_package;
const serving_grams = foodKeys.serving_grams;
const serving_name = foodKeys.serving_name;
const food_category = foodKeys.food_category;
const glucemic_status = foodKeys.glucemic_status;

const nameDescFields = [
  {
    labelText: "Food Name",
    labelFor: food_name,
    id: food_name,
    name: food_name,
    type: "text",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "",
    step: "",
    title: "",
    pattern: undefined,
  },
  {
    labelText: "Description",
    labelFor: food_description,
    id: food_description,
    name: food_description,
    type: "text",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "",
    step: "",
    title: "",
    pattern: undefined,
  },
];

const servingSizeFields = [
  {
    labelText: "Calories",
    labelFor: calories,
    id: calories,
    name: "nutrient",
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
    unit: null,
  },
  {
    labelText: "Carbohydrates",
    labelFor: carbohydrates,
    id: carbohydrates,
    name: "nutrient",
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
    unit: null,
  },
  {
    labelText: "Fats",
    labelFor: fats,
    id: fats,
    name: "nutrient",
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    unit: null,
    pattern: "",
  },
  {
    labelText: "Proteins",
    labelFor: proteins,
    id: proteins,
    name: "nutrient",
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
    unit: null,
  },
  {
    labelText: "Description for one serving",
    labelFor: serving_name,
    id: serving_name,
    name: serving_name,
    type: "text",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "",
    step: "",
    title: "",
    pattern: undefined,
    unit: null,
  },
  {
    labelText: "Serving amount",
    labelFor: serving_amount,
    id: serving_amount,
    name: serving_amount,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
    unit: null,
  },
  {
    labelText: "Equivalent weight in grams",
    labelFor: serving_grams,
    id: serving_grams,
    name: serving_grams,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
    unit: "g",
  },
];

const servingsPerPackage = [
  {
    labelText: "Servings per Package",
    labelFor: serving_amount_per_package,
    id: serving_amount_per_package,
    name: serving_amount_per_package,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
    unit: null,
  },
  {
    autoComplete: "off",
    id: price,
    isRequired: false,
    labelFor: price,
    labelText: "Price (optional)",
    max: "",
    min: "0",
    name: price,
    pattern: "",
    placeholder: "",
    step: "0.01",
    title: "",
    type: "number",
    unit: "U$D",
  },
];

const source = foodKeys.source;

const sourceField = {
  labelText: "Source",
  labelFor: source,
  id: source,
  name: source,
  type: "text",
  autoComplete: "off",
  isRequired: false,
  placeholder: "",
  max: "",
  min: "",
  step: "",
  title: "",
  pattern: undefined,
};

const cholesterol = nutrientKeys.cholesterol;
const fiber = nutrientKeys.fiber;
const potassium = nutrientKeys.potassium;
const sodium = nutrientKeys.sodium;

const firstOptionalTypes = [cholesterol, fiber, potassium, sodium];

const firstOptionalFields = firstOptionalTypes.map((key: string) => ({
  labelText: key,
  labelFor: key,
  id: key,
  name: "nutrient",
  type: "number",
  autoComplete: "off",
  isRequired: false,
  placeholder: "",
  max: "",
  min: "0",
  step: "0.01",
  title: "",
  pattern: "",
  unit: null,
}));

const sugar = nutrientKeys.sugar;
const fructose = nutrientKeys.fructose;
const galactose = nutrientKeys.galactose;
const glucose = nutrientKeys.glucose;
const lactose = nutrientKeys.lactose;
const maltose = nutrientKeys.maltose;
const sucrose = nutrientKeys.sucrose;

const sugarTypes = [
  sugar,
  fructose,
  galactose,
  glucose,
  lactose,
  maltose,
  sucrose,
];

const sugarFields = sugarTypes.map((key: string) => ({
  labelText: key,
  labelFor: key,
  id: key,
  name: "nutrient",
  type: "number",
  autoComplete: "off",
  isRequired: false,
  placeholder: "",
  max: "",
  min: "0",
  step: "0.01",
  title: "",
  pattern: "",
  unit: null,
}));

const saturated_fats = nutrientKeys.saturated_fats;
const monounsaturated_fats = nutrientKeys.monounsaturated_fats;
const polyunsaturated_fats = nutrientKeys.polyunsaturated_fats;
const total_omega_3 = nutrientKeys.total_omega_3;
const total_omega_6 = nutrientKeys.total_omega_6;
const trans_fats = nutrientKeys.trans_fats;

const fatsTypes = [
  saturated_fats,
  monounsaturated_fats,
  polyunsaturated_fats,
  total_omega_3,
  total_omega_6,
  maltose,
  trans_fats,
];

const fatsFields = fatsTypes.map((key: string) => ({
  labelText: key,
  labelFor: key,
  id: key,
  name: "nutrient",
  type: "number",
  autoComplete: "off",
  isRequired: false,
  placeholder: "",
  max: "",
  min: "0",
  step: "0.01",
  title: "",
  pattern: "",
  unit: null,
}));

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

const vitsAndMinsTypes = [
  betaine,
  caffeine,
  calcium,
  choline,
  copper,
  fluoride,
  folate,
  iron,
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

const vitsAndMinsFields = vitsAndMinsTypes.map((key: string) => ({
  labelText: key,
  labelFor: key,
  id: key,
  name: "nutrient",
  type: "number",
  autoComplete: "off",
  isRequired: false,
  placeholder: "",
  max: "",
  min: "0",
  step: "0.01",
  title: "",
  pattern: "",
  unit: null,
}));

const foodCategoryOptions = foodCategoriesKeys;

const foodCategorySelect = {
  autoComplete: "off",
  id: food_category,
  isRequired: false,
  labelFor: food_category,
  labelText: food_category,
  name: "food_category",
  options: foodCategoryOptions,
  placeholder: "",
  title: "",
};

const GlucemicStatusEnumOptions = foodGlucemicStatusKeys;

const foodGlucemicStatusSelect = {
  autoComplete: "off",
  id: glucemic_status,
  isRequired: false,
  labelFor: glucemic_status,
  labelText: glucemic_status,
  name: "glucemic_status",
  options: GlucemicStatusEnumOptions,
  placeholder: "",
  title: "",
};

export {
  fatsFields,
  firstOptionalFields,
  foodCategorySelect,
  nameDescFields,
  servingSizeFields,
  servingsPerPackage,
  sourceField,
  sugarFields,
  vitsAndMinsFields,
  foodGlucemicStatusSelect,
};
