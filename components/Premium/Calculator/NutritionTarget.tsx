import { FC, useEffect } from "react";
import { MEAL_PLANS } from "@/utils/content";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import Image from "next/image";

interface Props {
  setNutritionTargets: Function;
}

const NutritionTarget: FC<Props> = ({ setNutritionTargets }) => {
  const { user } = useSelector(selectAuthSlice);
  const body_data = user?.body_data;
  const plan_selected = user?.plan_selected;
  const planData = MEAL_PLANS.find((plan) => plan.id === plan_selected);
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
                <span>{carbsMin}g</span>-<span>{carbsMax}g</span>
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
                <span>{protsMin}g</span>-<span>{protsMax}g</span>
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
                <span>{fatsMin}g</span>-<span>{fatsMax}g</span>
              </div>
              <div>
                <span>{planData?.macros.fats.min}%</span>-
                <span>{planData?.macros.fats.max}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-start justify-center gap-1">
        <span className="text-lg font-semibold">Plan Selected:</span>
        <div className="flex flex-col items-center justify-center">
          <span className="flex w-full items-center justify-center text-center text-xl font-bold text-green-500">
            {planData?.name}
          </span>
          <Image
            src={`/images/plans/${plan_selected}.jpg`}
            alt={plan_selected || ""}
            width={150}
            height={150}
            className="pointer-events-none m-2 rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]"
          />
        </div>
      </div> */}
    </div>
  );
};

export default NutritionTarget;
