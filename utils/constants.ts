import { NutrientsEnum, NutritionMeasurements } from "@/types/foodTypes";

const g = NutritionMeasurements.g;
const mcg = NutritionMeasurements.mcg;
const mg = NutritionMeasurements.mg;

type Measurements = { [key in NutrientsEnum]?: string };

const getNutrientMeasurementUnit = (nutrient: string) => {
  const nutrients: Measurements = {
    [NutrientsEnum.betaine]: mcg,
    [NutrientsEnum.caffeine]: mcg,
    [NutrientsEnum.calcium]: mcg,
    [NutrientsEnum.calories]: g,
    [NutrientsEnum.carbohydrates]: g,
    [NutrientsEnum.cholesterol]: mg,
    [NutrientsEnum.choline]: mcg,
    [NutrientsEnum.copper]: mcg,
    [NutrientsEnum.fats]: g,
    [NutrientsEnum.fiber]: g,
    [NutrientsEnum.fluoride]: mcg,
    [NutrientsEnum.folate]: mcg,
    [NutrientsEnum.fructose]: g,
    [NutrientsEnum.galactose]: g,
    [NutrientsEnum.glucose]: g,
    [NutrientsEnum.iron]: mcg,
    [NutrientsEnum.lycopene]: mcg,
    [NutrientsEnum.magnesium]: mg,
    [NutrientsEnum.maltose]: g,
    [NutrientsEnum.manganese]: mg,
    [NutrientsEnum.monounsaturated_fats]: g,
    [NutrientsEnum.niacin]: mg,
    [NutrientsEnum.phosphorus]: mg,
    [NutrientsEnum.polyunsaturated_fats]: g,
    [NutrientsEnum.potassium]: mcg,
    [NutrientsEnum.proteins]: g,
    [NutrientsEnum.retinol]: mcg,
    [NutrientsEnum.saturated_fats]: g,
    [NutrientsEnum.selenium]: mcg,
    [NutrientsEnum.sodium]: mcg,
    [NutrientsEnum.sucrose]: g,
    [NutrientsEnum.sugar]: g,
    [NutrientsEnum.thiamine]: mg,
    [NutrientsEnum.total_omega_3]: g,
    [NutrientsEnum.total_omega_6]: g,
    [NutrientsEnum.trans_fats]: g,
    [NutrientsEnum.vitamin_a]: mcg,
    [NutrientsEnum.vitamin_b12]: mcg,
    [NutrientsEnum.vitamin_b2]: mg,
    [NutrientsEnum.vitamin_b6]: mg,
    [NutrientsEnum.vitamin_c]: mg,
    [NutrientsEnum.vitamin_d]: mcg,
    [NutrientsEnum.vitamin_d2]: mcg,
    [NutrientsEnum.vitamin_d3]: mcg,
    [NutrientsEnum.vitamin_e]: mg,
    [NutrientsEnum.vitamin_k]: mcg,
    [NutrientsEnum.water]: g,
    [NutrientsEnum.zinc]: mg,
  };
  return nutrients[nutrient as keyof Measurements];
};

export { getNutrientMeasurementUnit };
