import { Food, FoodScale, FoodScales, NutritionMeasurements } from "../types";
import { GRAMS_IN_ONE_OZ } from "@/constants";

const GRAMS = NutritionMeasurements.grams;
const OZ = NutritionMeasurements.oz;

const orderScales = ({ scales }: { scales: FoodScales }): FoodScales => {
  return [...scales].sort((a, b) => Number(a.isDefault) - Number(b.isDefault));
};

const getScalesWithPrimaryScales = ({
  scales,
}: {
  scales: FoodScales;
}): FoodScales => {
  const foodScales: FoodScales = [
    {
      scaleName: OZ,
      scaleAmount: 1,
      scaleGrams: GRAMS_IN_ONE_OZ,
      isDefault: false,
      id: OZ,
    },
    {
      scaleName: GRAMS,
      scaleAmount: 1,
      scaleGrams: 1,
      isDefault: false,
      id: GRAMS,
    },
  ];
  [...scales]
    .sort((a, b) => Number(a.isDefault) - Number(b.isDefault))
    .forEach((scale) => foodScales.unshift(scale));
  return foodScales;
};

const getScaleOptions = (scalesMerged: FoodScales) => {
  const scaleNames = scalesMerged.map((s) => {
    if (s.scaleName === GRAMS) return { value: GRAMS, text: GRAMS };
    else if (s.scaleName === OZ) return { value: OZ, text: `${OZ} (28.35 g)` };
    else
      return {
        value: s.scaleName || "",
        text: `${s.scaleName} (${s.scaleGrams} g)`,
      };
  });
  const options = [...scaleNames];
  return options;
};

const getDefaultScale = (scales: FoodScales): FoodScale =>
  scales?.find((s) => s.isDefault === true) || scales[0];

export {
  orderScales,
  getScaleOptions,
  getDefaultScale,
  getScalesWithPrimaryScales,
};
