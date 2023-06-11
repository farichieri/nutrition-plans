import {
  FoodNutrients,
  FoodNutritionDetail,
  NutrientsEnum,
} from "@/features/foods";
import { FC, useState } from "react";
import { formatToFixed } from "@/utils/format";
import { getNutritionTargets } from "@/components/Premium/Calculator/helpers";
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
    },
    {
      nutrient: NutrientsEnum.carbohydrates,
      max: nutrition_targets?.carbohydrates.max,
      min: nutrition_targets?.carbohydrates.min,
      value: nutrients.carbohydrates,
    },
    {
      nutrient: NutrientsEnum.fats,
      max: nutrition_targets?.fats.max,
      min: nutrition_targets?.fats.min,
      value: nutrients.fats,
    },
    {
      nutrient: NutrientsEnum.proteins,
      max: nutrition_targets?.proteins.max,
      min: nutrition_targets?.proteins.min,
      value: nutrients.proteins,
    },
  ];

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-10 px-5">
      {openDetails && (
        <FoodNutritionDetail
          nutrients={nutrients}
          handleClose={() => setOpenDetails(false)}
        />
      )}
      <div className="flex w-full flex-col gap-0">
        <div className="mb-4 flex items-center gap-2">
          <span className="material-icons-outlined text-green-500">
            data_usage
          </span>
          <span className="text-2xl font-semibold">Nutrition Values</span>
        </div>
        <PieGraph nutrients={nutrients} />
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col divide-y border-b">
              {NUTRIENT_TARGETS.map((nut) => {
                const isInRange =
                  Number(nut.value) >= Number(nut.min) &&
                  Number(nut.value) <= Number(nut.max);
                return (
                  <div className="flex items-baseline">
                    <span className="flex basis-1/3 truncate capitalize">
                      {nut.nutrient}
                    </span>
                    <div
                      className={`flex basis-1/2 justify-end text-xs opacity-50 `}
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
                          isInRange ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {nut.value || "-"}
                      </span>
                      {Number(nut.value) >= Number(nut.max) && (
                        <span className="absolute right-[-1.25rem] flex text-sm">
                          🔻
                        </span>
                      )}
                      {Number(nut.value) <= Number(nut.min) && (
                        <span className="absolute right-[-1.25rem] flex text-sm">
                          🔺
                        </span>
                      )}
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
      </div>
    </div>
  );
};

export default Nutrition;
