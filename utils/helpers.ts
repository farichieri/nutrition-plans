import {
  NutrientsClasified,
  Nutrients,
  NutritionMeasurements,
  NutrientsKeys,
  NutrientsT,
} from "@/features/foods/types";

const g = NutritionMeasurements.g;
const kcal = NutritionMeasurements.kcal;
const mcg = NutritionMeasurements.mcg;
const mg = NutritionMeasurements.mg;

type Measurements = {
  [key in NutrientsKeys]?: { unit: string; requirement: number | null };
};

const getNutrientMeasurementUnit = (nutrient: string) => {
  const nutrients: Measurements = {
    [Nutrients.betaine]: {
      unit: mcg,
      requirement: null,
    },
    [Nutrients.biotin]: {
      unit: mcg,
      requirement: 30,
    },
    [Nutrients.caffeine]: {
      unit: mg,
      requirement: null,
    },
    [Nutrients.calcium]: {
      unit: mcg,
      requirement: 1300,
    },
    [Nutrients.calories]: {
      unit: kcal,
      requirement: null,
    },
    [Nutrients.carbohydrates]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.cholesterol]: {
      unit: mg,
      requirement: null,
    },
    [Nutrients.choline]: {
      unit: mcg,
      requirement: 550,
    },
    [Nutrients.copper]: {
      unit: mcg,
      requirement: 0.9,
    },
    [Nutrients.fats]: {
      unit: g,
      requirement: null, // 78
    },
    [Nutrients.fiber]: {
      unit: g,
      requirement: 28,
    },
    [Nutrients.fluoride]: {
      unit: mcg,
      requirement: null,
    },
    [Nutrients.folate]: {
      unit: mcg,
      requirement: 400,
    },
    [Nutrients.fructose]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.galactose]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.glucose]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.iron]: {
      unit: mg,
      requirement: 18,
    },
    [Nutrients.lactose]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.lycopene]: {
      unit: mcg,
      requirement: null,
    },
    [Nutrients.magnesium]: {
      unit: mg,
      requirement: 420,
    },
    [Nutrients.maltose]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.manganese]: {
      unit: mg,
      requirement: 2.3,
    },
    [Nutrients.monounsaturated_fats]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.niacin]: {
      unit: mg,
      requirement: 16,
    },
    [Nutrients.phosphorus]: {
      unit: mg,
      requirement: 1250,
    },
    [Nutrients.polyunsaturated_fats]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.potassium]: {
      unit: mg,
      requirement: 4700,
    },
    [Nutrients.proteins]: {
      unit: g,
      requirement: null, // 50
    },
    [Nutrients.retinol]: {
      unit: mcg,
      requirement: null,
    },
    [Nutrients.saturated_fats]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.selenium]: {
      unit: mcg,
      requirement: 55,
    },
    [Nutrients.sodium]: {
      unit: mg,
      requirement: 2300,
    },
    [Nutrients.sucrose]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.sugar]: {
      unit: g,
      requirement: 50,
    },
    [Nutrients.thiamine]: {
      unit: mcg,
      requirement: 1.2,
    },
    [Nutrients.trans_fats]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.vitamin_a]: {
      unit: mcg,
      requirement: 900,
    },
    [Nutrients.vitamin_b12]: {
      unit: mcg,
      requirement: 2.4,
    },
    [Nutrients.riboflavin]: {
      unit: mg,
      requirement: 1.3,
    },
    [Nutrients.vitamin_b6]: {
      unit: mg,
      requirement: 1.7,
    },
    [Nutrients.vitamin_c]: {
      unit: mg,
      requirement: 90,
    },
    [Nutrients.vitamin_d]: {
      unit: mcg,
      requirement: 20,
    },
    [Nutrients.vitamin_d2]: {
      unit: mcg,
      requirement: null,
    },
    [Nutrients.vitamin_d3]: {
      unit: mcg,
      requirement: null,
    },
    [Nutrients.vitamin_e]: {
      unit: mg,
      requirement: 15,
    },
    [Nutrients.vitamin_k]: {
      unit: mcg,
      requirement: 120,
    },
    [Nutrients.water]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.zinc]: {
      unit: mg,
      requirement: 11,
    },
    [Nutrients.iodine]: {
      unit: mcg,
      requirement: 150,
    },
    [Nutrients.panthotenic_acid]: {
      unit: mg,
      requirement: 5,
    },
    [Nutrients.phenylalanine]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.threonine]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.isoleucine]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.leucine]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.lysine]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.methionine]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.valine]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.glutamic_acid]: {
      unit: g,
      requirement: null,
    },
    [Nutrients.trypthophan]: {
      unit: g,
      requirement: null,
    },
  };
  return nutrients[nutrient as keyof Measurements];
};

const getNutrientsClasified = (nutrients: NutrientsT) => {
  let principals: NutrientsClasified = {};
  let sugars: NutrientsClasified = {};
  let fats: NutrientsClasified = {};
  let vitsAndOther: NutrientsClasified = {};
  let aminoacids: NutrientsClasified = {};
  let minerals: NutrientsClasified = {};

  const clasify = (nutrient: any) => {
    switch (nutrient) {
      case Nutrients.caffeine:
      case Nutrients.calories:
      case Nutrients.carbohydrates:
      case Nutrients.cholesterol:
      case Nutrients.fats:
      case Nutrients.fiber:
      case Nutrients.proteins:
      case Nutrients.sodium:
        principals[nutrient as keyof NutrientsClasified] =
          nutrients[nutrient as keyof NutrientsT];
        break;
      case Nutrients.sugar:
      case Nutrients.sucrose:
      case Nutrients.glucose:
      case Nutrients.fructose:
      case Nutrients.lactose:
      case Nutrients.maltose:
      case Nutrients.galactose:
        sugars[nutrient as keyof NutrientsClasified] =
          nutrients[nutrient as keyof NutrientsT];
        break;
      case Nutrients.saturated_fats:
      case Nutrients.monounsaturated_fats:
      case Nutrients.polyunsaturated_fats:
      case Nutrients.trans_fats:
        fats[nutrient as keyof NutrientsClasified] =
          nutrients[nutrient as keyof NutrientsT];
        break;

      case Nutrients.betaine:
      case Nutrients.biotin:
      case Nutrients.choline:
      case Nutrients.fluoride:
      case Nutrients.folate:
      case Nutrients.lycopene:
      case Nutrients.niacin:
      case Nutrients.panthotenic_acid:
      case Nutrients.retinol:
      case Nutrients.riboflavin:
      case Nutrients.thiamine:
      case Nutrients.vitamin_a:
      case Nutrients.vitamin_b12:
      case Nutrients.vitamin_b6:
      case Nutrients.vitamin_c:
      case Nutrients.vitamin_d:
      case Nutrients.vitamin_d2:
      case Nutrients.vitamin_d3:
      case Nutrients.vitamin_e:
      case Nutrients.vitamin_k:
      case Nutrients.zinc:
        vitsAndOther[nutrient as keyof NutrientsClasified] =
          nutrients[nutrient as keyof NutrientsT];
        break;

      case Nutrients.calcium:
      case Nutrients.iron:
      case Nutrients.magnesium:
      case Nutrients.phosphorus:
      case Nutrients.potassium:
      case Nutrients.zinc:
      case Nutrients.copper:
      case Nutrients.manganese:
      case Nutrients.iodine:
      case Nutrients.selenium:
        minerals[nutrient as keyof NutrientsClasified] =
          nutrients[nutrient as keyof NutrientsT];
        break;

      case Nutrients.glutamic_acid:
      case Nutrients.isoleucine:
      case Nutrients.leucine:
      case Nutrients.lysine:
      case Nutrients.methionine:
      case Nutrients.phenylalanine:
      case Nutrients.threonine:
      case Nutrients.trypthophan:
      case Nutrients.valine:
        aminoacids[nutrient as keyof NutrientsClasified] =
          nutrients[nutrient as keyof NutrientsT];
      default:
        break;
    }
  };
  Object.keys(nutrients).map((nutrient) => {
    clasify(nutrient);
  });

  return {
    aminoacids,
    fats,
    minerals,
    principals,
    sugars,
    vitsAndOther,
  };
};

export { getNutrientMeasurementUnit, getNutrientsClasified };
