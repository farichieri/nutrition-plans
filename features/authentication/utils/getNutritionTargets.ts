import { MEAL_PLANS } from "@/data/content";
import { NutritionTargets } from "@/features/authentication";

const getNutritionTargets = (
  calories: number,
  planSelected: string
): NutritionTargets => {
  const getMacro = (
    personCalories: number,
    macroMultiplyer: number,
    macroValue: number
  ): number => {
    return Math.round(
      (Number(personCalories) * (Number(macroValue) / 100)) / macroMultiplyer
    );
  };

  const planData = MEAL_PLANS.find((plan) => plan.id === planSelected);

  const carbsMin = getMacro(calories, 4, Number(planData?.macros.carbs.min));
  const carbsMax = getMacro(calories, 4, Number(planData?.macros.carbs.max));

  const protsMin = getMacro(calories, 4, Number(planData?.macros.proteins.min));
  const protsMax = getMacro(calories, 4, Number(planData?.macros.proteins.max));

  const fatsMin = getMacro(calories, 9, Number(planData?.macros.fats.min));
  const fatsMax = getMacro(calories, 9, Number(planData?.macros.fats.max));

  return {
    calories: calories,
    carbohydrates: {
      min: carbsMin,
      max: carbsMax,
    },
    proteins: {
      min: protsMin,
      max: protsMax,
    },
    fats: {
      min: fatsMin,
      max: fatsMax,
    },
  };
};

export { getNutritionTargets };
