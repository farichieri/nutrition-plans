import { NewFood } from "@/types/initialTypes";

let foodKeys: any = {};
Object.keys(NewFood).forEach((key) => {
  foodKeys[key] = key;
});

const food_description = foodKeys.food_description;
const food_name = foodKeys.food_name;
const nut_calories = foodKeys.nut_calories;
const nut_carbohydrates = foodKeys.nut_carbohydrates;
const nut_fats = foodKeys.nut_fats;
const price = foodKeys.price;
const proteins = foodKeys.nut_proteins;
const serving_amount = foodKeys.serving_amount;
const serving_amount_per_package = foodKeys.serving_amount_per_package;
const serving_grams = foodKeys.serving_grams;
const serving_name = foodKeys.serving_name;

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
    labelFor: nut_calories,
    id: nut_calories,
    name: nut_calories,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
  },
  {
    labelText: "Carbohydrates",
    labelFor: nut_carbohydrates,
    id: nut_carbohydrates,
    name: nut_carbohydrates,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
  },
  {
    labelText: "Fats",
    labelFor: nut_fats,
    id: nut_fats,
    name: nut_fats,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
  },
  {
    labelText: "Proteins",
    labelFor: proteins,
    id: proteins,
    name: proteins,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "",
    title: "",
    pattern: "",
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
  },
  {
    labelText: "Price (optional)",
    labelFor: price,
    id: price,
    name: price,
    type: "number",
    autoComplete: "off",
    isRequired: true,
    placeholder: "",
    max: "",
    min: "0",
    step: "0.1",
    title: "",
    pattern: "",
  },
];

const optionalNutritionFields = Object.keys(NewFood.nutrients).map(
  (key: string) => ({
    labelText: key,
    labelFor: key,
    id: key,
    name: key,
    type: "number",
    autoComplete: "off",
    isRequired: false,
    placeholder: "",
    max: "",
    min: "0",
    step: "0.1",
    title: "",
    pattern: "",
  })
);

export {
  nameDescFields,
  servingSizeFields,
  servingsPerPackage,
  optionalNutritionFields,
};
