import {
  FoodNutrients,
  FoodNutritionDetail,
  NutrientsEnum,
} from "@/features/foods";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FC, useState } from "react";
import { formatToFixed, formatTwoDecimals } from "@/utils/format";
import { getNutritionTargets } from "@/features/authentication/utils/getNutritionTargets";
import { PlansEnum } from "@/types";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import PieGraph from "@/components/PieGraph/PieGraph";

interface Props {
  nutrients: FoodNutrients;
  planID: PlansEnum | null;
}

const Nutrition: FC<Props> = ({ nutrients, planID }) => {
  const { user } = useSelector(selectAuthSlice);

  if (!user) return <></>;

  const calories = user.nutrition_targets.calories || 0;
  const nutrition_targets = planID && getNutritionTargets(calories, planID);
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  if (!nutrients) {
    return <div>No Nutrients Found.</div>;
  }

  const NUTRIENT_TARGETS = [
    {
      nutrient: NutrientsEnum.calories,
      min: Number(nutrition_targets?.calories) - 100,
      max: Number(nutrition_targets?.calories) + 100,
      value: nutrients.calories,
      isInRange: false,
      diff: 0,
    },
    {
      nutrient: NutrientsEnum.carbohydrates,
      max: nutrition_targets?.carbohydrates.max,
      min: nutrition_targets?.carbohydrates.min,
      value: nutrients.carbohydrates,
      isInRange: false,
      diff: 0,
    },
    {
      nutrient: NutrientsEnum.fats,
      max: nutrition_targets?.fats.max,
      min: nutrition_targets?.fats.min,
      value: nutrients.fats,
      isInRange: false,
      diff: 0,
    },
    {
      nutrient: NutrientsEnum.proteins,
      max: nutrition_targets?.proteins.max,
      min: nutrition_targets?.proteins.min,
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

  return (
    <div className="w-full">
      {openDetails && (
        <FoodNutritionDetail
          nutrients={nutrients}
          handleClose={() => setOpenDetails(false)}
        />
      )}
      <div
        className={`relative flex w-full flex-wrap items-center justify-center gap-10 rounded-xl border p-4 ${
          !isAllInRange
            ? "bg-white dark:bg-gray-500/20"
            : "border-green-500 bg-green-500/20 "
        }`}
      >
        <div className="mb-1 flex h-9 w-full items-center gap-2">
          <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
          <span className="text-2xl font-semibold">Nutrition</span>
        </div>
        <div className="flex w-full flex-col gap-0">
          <PieGraph nutrients={nutrients} />
          <div
            className={`relative mb-4 flex w-full flex-wrap items-center justify-center rounded-md ${
              !isAllInRange ? "pr-11" : ""
            }`}
          >
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col divide-y border-b">
                {NUTRIENT_TARGETS.map((nut) => {
                  return (
                    <div className="flex items-baseline" key={nut.nutrient}>
                      <span className="flex basis-1/2 truncate capitalize">
                        {nut.nutrient}
                      </span>
                      <div
                        className={`flex basis-1/3 justify-end text-xs opacity-50 `}
                      >
                        {nut.min && (
                          <>
                            <span>
                              {"("}
                              {nut.min}
                            </span>
                            -
                          </>
                        )}
                        <span>
                          {nut.max}
                          {")"}
                        </span>
                      </div>
                      <div className="relative ml-auto flex basis-1/12 items-center justify-end">
                        <span
                          className={` ${
                            nut.isInRange ? "text-green-500" : ""
                          }`}
                        >
                          {formatTwoDecimals(nut.value) || "-"}
                        </span>
                        <div className="absolute left-full ">
                          {Number(nut.value) > Number(nut.max) && (
                            <span className="flex text-xs text-red-500">
                              🔻{formatTwoDecimals(nut.diff)}
                            </span>
                          )}
                          {Number(nut.value) < Number(nut.min) && (
                            <span className="flex text-xs text-red-500">
                              🔺{formatTwoDecimals(nut.diff)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <span>Fiber:</span>
                  <span>{nutrients.fiber || "-"}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span>Net carbs:</span>
                  <span>
                    {formatToFixed(
                      Number(nutrients.carbohydrates) - Number(nutrients.fiber)
                    ) || "-"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <span>Sodium:</span>
                  <span>{nutrients.sodium || "-"}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span>Cholesterol:</span>
                  <span>{nutrients.cholesterol || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="m-auto rounded-3xl border px-4 py-2 duration-300 hover:bg-slate-500/20"
            onClick={handleOpenDetail}
          >
            Detailed Nutrition
          </button>
          <div>
            {isAllInRange ? (
              <span className="my-4 flex w-full justify-center text-green-500 ">
                Good Job 💪! Nutrients target achieved.
              </span>
            ) : (
              <span className="my-4 flex w-full justify-center text-red-500 ">
                You are out of target.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
