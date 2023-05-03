import { FC, useEffect } from "react";
import { MEAL_PLANS } from "@/utils/content";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";

interface Props {
  setNutritionTargets: Function;
}

const NutritionTarget: FC<Props> = ({ setNutritionTargets }) => {
  const { user } = useSelector(selectAuthSlice);
  const body_data = user?.body_data;
  const planData = MEAL_PLANS.find((plan) => plan.id === user?.plan_selected);
  const calories = Number(body_data?.kcals_recommended);

  const getMacro = (
    personCalories: number,
    macroMultiplyer: number,
    macroValue: number
  ): number => {
    return Math.round(
      (Number(personCalories) * (Number(macroValue) / 100)) / macroMultiplyer
    );
  };

  const carbsMin = getMacro(calories, 4, Number(planData?.macros.carbs.min));
  const carbsMax = getMacro(calories, 4, Number(planData?.macros.carbs.max));

  const protsMin = getMacro(calories, 4, Number(planData?.macros.proteins.min));
  const protsMax = getMacro(calories, 4, Number(planData?.macros.proteins.max));

  const fatsMin = getMacro(calories, 4, Number(planData?.macros.fats.min));
  const fatsMax = getMacro(calories, 4, Number(planData?.macros.fats.max));

  useEffect(() => {
    if (carbsMin && carbsMax && protsMin && protsMax && fatsMin && fatsMax) {
      setNutritionTargets({
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
          max: protsMax,
        },
      });
    }
  }, [carbsMin, carbsMax, protsMin, protsMax, fatsMin, fatsMax]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <span>Plan Selected:</span>
        <span className="font-semibold capitalize text-green-500">
          {user?.plan_selected}
        </span>
      </div>
      <div>
        <span>Macronutrients distribution:</span>
        <div className="max-w-xs px-2">
          <div className="flex justify-between font-semibold text-[var(--carbs-color)]">
            <span>Carbohydrates:</span>
            <div className="flex gap-1">
              <span>{carbsMin}g</span>-<span>{carbsMax}g</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-[var(--prots-color)]">
            <span>Proteins:</span>
            <div className="flex gap-1">
              <span>{protsMin}g</span>-<span>{protsMax}g</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-[var(--fats-color)]">
            <span>Fats:</span>
            <div className="flex gap-1">
              <span>{fatsMin}g</span>-<span>{fatsMax}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTarget;
