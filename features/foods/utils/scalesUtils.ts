import { Food, FoodScale, FoodScales, NutritionMeasurements } from "../types";
import { GRAMS_IN_ONE_OZ } from "@/utils/constants";

const GRAMS = NutritionMeasurements.grams;
const OZ = NutritionMeasurements.oz;

const mergeScales = (food: Food): FoodScales => {
  const foodScales: FoodScales = [
    {
      scale_name: OZ,
      scale_amount: 1,
      scale_grams: GRAMS_IN_ONE_OZ,
      is_default: false,
      id: null,
    },
    {
      scale_name: GRAMS,
      scale_amount: 1,
      scale_grams: 1,
      is_default: false,
      id: null,
    },
  ];
  [...food.scales]
    .sort((a, b) => Number(a.is_default) - Number(b.is_default))
    .forEach((scale) => foodScales.unshift(scale));
  return foodScales;
};

const getScaleOptions = (scalesMerged: FoodScales) => {
  const scaleNames = scalesMerged.map((s) => {
    if (s.scale_name === GRAMS) return { value: GRAMS, text: GRAMS };
    else if (s.scale_name === OZ) return { value: OZ, text: `${OZ} (28.35 g)` };
    else
      return {
        value: s.scale_name || "",
        text: `${s.scale_name} (${s.scale_grams} g)`,
      };
  });
  const options = [...scaleNames];
  return options;
};

const getDefaultScale = (scales: FoodScales): FoodScale =>
  scales.find((s) => s.is_default === true) || scales[0];

export { mergeScales, getScaleOptions, getDefaultScale };
