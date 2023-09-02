import { NutritionTargets } from "@/features/authentication";
import { Nutrients, NutrientsT } from "@/features/foods";

const getDietNutritionTargets = ({
  nutritionTargets,
  nutrients,
}: {
  nutritionTargets: NutritionTargets;
  nutrients: NutrientsT;
}) => {
  const NUTRIENT_TARGETS = [
    {
      nutrient: Nutrients.calories,
      min: Number(nutritionTargets?.calories) - 100,
      max: Number(nutritionTargets?.calories) + 100,
      value: nutrients.calories,
      isInRange: false,
      diff: 0,
    },
    {
      nutrient: Nutrients.carbohydrates,
      max: nutritionTargets?.carbohydrates.max,
      min: nutritionTargets?.carbohydrates.min,
      value: nutrients.carbohydrates,
      isInRange: false,
      diff: 0,
    },
    {
      nutrient: Nutrients.fats,
      max: nutritionTargets?.fats.max,
      min: nutritionTargets?.fats.min,
      value: nutrients.fats,
      isInRange: false,
      diff: 0,
    },
    {
      nutrient: Nutrients.proteins,
      max: nutritionTargets?.proteins.max,
      min: nutritionTargets?.proteins.min,
      value: nutrients.proteins,
      isInRange: false,
      diff: 0,
    },
  ];

  const getIsInRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  };
  const getDifference = (value: number, min: number, max: number): number => {
    if (value > max) {
      return value - max;
    } else if (value < min) {
      return min - value;
    } else {
      return 0;
    }
  };
  const completeTargetValues = () => {
    NUTRIENT_TARGETS.map((nutrient, index) => {
      NUTRIENT_TARGETS[index].isInRange = getIsInRange(
        Number(nutrient.value),
        Number(nutrient.min),
        Number(nutrient.max)
      );
      NUTRIENT_TARGETS[index].diff = getDifference(
        Number(nutrient.value),
        Number(nutrient.min),
        Number(nutrient.max)
      );
    });
  };

  completeTargetValues();

  const addIsAllInRange = (): boolean => {
    let result = true;
    NUTRIENT_TARGETS.forEach((nutrient) => {
      if (!nutrient.isInRange) {
        result = false;
      }
    });
    return result;
  };

  let isAllInRange = addIsAllInRange();

  return {
    NUTRIENT_TARGETS,
    isAllInRange,
  };
};

export { getDietNutritionTargets };
