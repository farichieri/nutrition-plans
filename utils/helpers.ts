import { NutrientsEnum, NutritionMeasurements } from "@/types/foodTypes";

const g = NutritionMeasurements.g;
const kcal = NutritionMeasurements.kcal;
const mcg = NutritionMeasurements.mcg;
const mg = NutritionMeasurements.mg;

type Measurements = {
  [key in NutrientsEnum]?: { unit: string; requirement: number | null };
};

const getNutrientMeasurementUnit = (nutrient: string) => {
  const nutrients: Measurements = {
    [NutrientsEnum.betaine]: {
      unit: mcg,
      requirement: null,
    },
    [NutrientsEnum.caffeine]: {
      unit: mg,
      requirement: null,
    },
    [NutrientsEnum.calcium]: {
      unit: mcg,
      requirement: 1300,
    },
    [NutrientsEnum.calories]: {
      unit: kcal,
      requirement: null,
    },
    [NutrientsEnum.carbohydrates]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.cholesterol]: {
      unit: mg,
      requirement: null,
    },
    [NutrientsEnum.choline]: {
      unit: mcg,
      requirement: 550,
    },
    [NutrientsEnum.copper]: {
      unit: mcg,
      requirement: 0.9,
    },
    [NutrientsEnum.fats]: {
      unit: g,
      requirement: null, // 78
    },
    [NutrientsEnum.fiber]: {
      unit: g,
      requirement: 28,
    },
    [NutrientsEnum.fluoride]: {
      unit: mcg,
      requirement: null,
    },
    [NutrientsEnum.folate]: {
      unit: mcg,
      requirement: 400,
    },
    [NutrientsEnum.fructose]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.galactose]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.glucose]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.iron]: {
      unit: mg,
      requirement: 18,
    },
    [NutrientsEnum.lactose]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.lycopene]: {
      unit: mcg,
      requirement: null,
    },
    [NutrientsEnum.magnesium]: {
      unit: mg,
      requirement: 420,
    },
    [NutrientsEnum.maltose]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.manganese]: {
      unit: mg,
      requirement: 2.3,
    },
    [NutrientsEnum.monounsaturated_fats]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.niacin]: {
      unit: mg,
      requirement: 16,
    },
    [NutrientsEnum.phosphorus]: {
      unit: mg,
      requirement: 1250,
    },
    [NutrientsEnum.polyunsaturated_fats]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.potassium]: {
      unit: mg,
      requirement: 4700,
    },
    [NutrientsEnum.proteins]: {
      unit: g,
      requirement: null, // 50
    },
    [NutrientsEnum.retinol]: {
      unit: mcg,
      requirement: null,
    },
    [NutrientsEnum.saturated_fats]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.selenium]: {
      unit: mcg,
      requirement: 55,
    },
    [NutrientsEnum.sodium]: {
      unit: mg,
      requirement: 2300,
    },
    [NutrientsEnum.sucrose]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.sugar]: {
      unit: g,
      requirement: 50,
    },
    [NutrientsEnum.thiamine]: {
      unit: mcg,
      requirement: 1.2,
    },
    [NutrientsEnum.total_omega_3]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.total_omega_6]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.trans_fats]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.vitamin_a]: {
      unit: mcg,
      requirement: 900,
    },
    [NutrientsEnum.vitamin_b12]: {
      unit: mcg,
      requirement: 2.4,
    },
    [NutrientsEnum.vitamin_b2]: {
      unit: mg,
      requirement: 1.3,
    },
    [NutrientsEnum.vitamin_b6]: {
      unit: mg,
      requirement: 1.7,
    },
    [NutrientsEnum.vitamin_c]: {
      unit: mg,
      requirement: 90,
    },
    [NutrientsEnum.vitamin_d]: {
      unit: mcg,
      requirement: 20,
    },
    [NutrientsEnum.vitamin_d2]: {
      unit: mcg,
      requirement: null,
    },
    [NutrientsEnum.vitamin_d3]: {
      unit: mcg,
      requirement: null,
    },
    [NutrientsEnum.vitamin_e]: {
      unit: mg,
      requirement: 15,
    },
    [NutrientsEnum.vitamin_k]: {
      unit: mcg,
      requirement: 120,
    },
    [NutrientsEnum.water]: {
      unit: g,
      requirement: null,
    },
    [NutrientsEnum.zinc]: {
      unit: mg,
      requirement: 11,
    },
  };
  return nutrients[nutrient as keyof Measurements];
};

export { getNutrientMeasurementUnit };
