"use client";

import { FC, useState } from "react";

import Spinner from "@/components/Loader/Spinner";
import PieGraph from "@/components/PieGraph/PieGraph";
import { FoodNutritionDetail, NutrientsT } from "@/features/foods";
import { formatTwoDecimals } from "@/utils";

interface Props {
  nutrients: NutrientsT;
}

const RecipeNutrition: FC<Props> = ({ nutrients }) => {
  const [openDetails, setOpenDetails] = useState(false);

  if (!nutrients) {
    return (
      <div>
        <Spinner customClass="h-4 w-4" />
      </div>
    );
  }

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  return (
    <div className="flex w-full flex-wrap items-start p-4 sm:px-10">
      {openDetails && <FoodNutritionDetail nutrients={nutrients} />}
      <div className="flex w-full flex-col gap-2"></div>
      <div className="flex w-full max-w-lg flex-col gap-5">
        <div className="flex items-center gap-2"></div>
        <PieGraph nutrients={nutrients} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex w-full justify-between">
              <span>Calories:</span>
              <span>{nutrients.calories || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Carbs:</span>
              <span>{formatTwoDecimals(nutrients.carbohydrates) || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Fats:</span>
              <span>{formatTwoDecimals(nutrients.fats) || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Proteins:</span>
              <span>{formatTwoDecimals(nutrients.proteins) || "-"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <span>Fiber:</span>
            <span>{formatTwoDecimals(nutrients.fiber) || "-"}</span>
          </div>
          <div className="flex w-full justify-between">
            <span>Net carbs:</span>
            <span>
              {formatTwoDecimals(
                Number(nutrients.carbohydrates) - Number(nutrients.fiber)
              ) || "-"}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <span>Sodium:</span>
            <span>{formatTwoDecimals(nutrients.sodium) || "-"}</span>
          </div>
          <div className="flex w-full justify-between">
            <span>Cholesterol:</span>
            <span>{formatTwoDecimals(nutrients.cholesterol) || "-"}</span>
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

export default RecipeNutrition;
