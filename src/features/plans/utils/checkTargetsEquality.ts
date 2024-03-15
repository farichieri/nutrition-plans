import { NutritionTargets } from "@/features/authentication";

const checkTargetsEquality = ({
  userTargets,
  dietTargets,
}: {
  userTargets: NutritionTargets;
  dietTargets: NutritionTargets;
}): boolean => {
  let result = true;

  if (userTargets.calories !== dietTargets.calories) {
    result = false;
  }
  if (userTargets.carbohydrates.max !== dietTargets.carbohydrates.max) {
    result = false;
  }
  if (userTargets.carbohydrates.min !== dietTargets.carbohydrates.min) {
    result = false;
  }
  if (userTargets.fats.max !== dietTargets.fats.max) {
    result = false;
  }
  if (userTargets.fats.min !== dietTargets.fats.min) {
    result = false;
  }
  if (userTargets.proteins.max !== dietTargets.proteins.max) {
    result = false;
  }
  if (userTargets.proteins.min !== dietTargets.proteins.min) {
    result = false;
  }

  return result;
};

export { checkTargetsEquality };
