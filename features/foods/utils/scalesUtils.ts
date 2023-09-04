import { FoodScale, FoodScales, NutritionMeasurements } from "../types";
import { GRAMS_IN_ONE_OZ } from "@/constants";

const GRAMS = NutritionMeasurements.grams;
const OZ = NutritionMeasurements.oz;

const getScalesWithPrimaryScales = ({
  scales,
}: {
  scales: FoodScales;
}): FoodScales => {
  const primaryScales: FoodScales = [
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

  return [...scales, ...primaryScales];
};

const orderScales = ({ scales }: { scales: FoodScales }): FoodScales => {
  const result = [...scales];
  const defaultIndex = result.findIndex((scale) => scale.isDefault === true);
  const defaultScale = result.splice(defaultIndex, 1)[0];
  result.unshift(defaultScale);

  return result;
};

const getAllScales = ({ scales }: { scales: FoodScales }): FoodScales => {
  const allScales = getScalesWithPrimaryScales({ scales });
  const scalesOrdered = orderScales({ scales: allScales });
  return scalesOrdered;
};

const getScaleOptions = ({ scales }: { scales: FoodScales }) => {
  const allScales = getScalesWithPrimaryScales({ scales });

  const scalesOrdered = orderScales({ scales: allScales });

  const scaleNames = scalesOrdered.map((s) => {
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
  getAllScales,
};
