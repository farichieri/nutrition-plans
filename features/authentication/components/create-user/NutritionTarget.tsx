import { FC } from "react";
import { MEAL_PLANS } from "@/data/content";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useSelector } from "react-redux";
import { getNutritionTargets } from "../../utils/getNutritionTargets";
import { PlansEnum } from "@/types";

interface Props {
  calories: number;
  plan_selected: PlansEnum;
}

const NutritionTarget: FC<Props> = ({ calories, plan_selected }) => {
  const { user } = useSelector(selectAuthSlice);
  const planData = MEAL_PLANS.find((plan) => plan.id === plan_selected);
  const nutritionTargets =
    calories && plan_selected && getNutritionTargets(calories, plan_selected);

  if (!user || !nutritionTargets) return <></>;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="text-lg font-semibold">
          Macronutrients distribution in your{" "}
          <span className="text-xl font-bold text-green-500">
            {planData?.name}{" "}
          </span>
          plan:
        </span>
        <div className="max-w-md px-2 xs:text-[10px] s:text-xs sm:text-base">
          <div className="flex justify-between font-semibold text-[var(--carbs-color)]">
            <span>Carbohydrates:</span>
            <div className="flex gap-4 sm:gap-10">
              <div className="flex gap-1">
                <span>{nutritionTargets.carbohydrates.min}g</span>-
                <span>{nutritionTargets.carbohydrates.min}g</span>
              </div>
              <div>
                <span>{planData?.macros.carbs.min}%</span>-
                <span>{planData?.macros.carbs.max}%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-[var(--prots-color)]">
            <span>Proteins:</span>

            <div className="flex gap-4 sm:gap-10">
              <div className="flex gap-1">
                <span>{nutritionTargets.proteins.min}g</span>-
                <span>{nutritionTargets.proteins.max}g</span>
              </div>
              <div>
                <span>{planData?.macros.proteins.min}%</span>-
                <span>{planData?.macros.proteins.max}%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-[var(--fats-color)]">
            <span>Fats:</span>
            <div className="flex gap-4 sm:gap-10">
              <div className="flex gap-1">
                <span>{nutritionTargets.fats.min}g</span>-
                <span>{nutritionTargets.fats.max}g</span>
              </div>
              <div>
                <span>{planData?.macros.fats.min}%</span>-
                <span>{planData?.macros.fats.max}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTarget;
