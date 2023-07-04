import {
  Food,
  FoodNutrients,
  mergeScales,
  NutritionMeasurements,
} from "@/features/foods";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { formatToFixed } from "@/utils/format";
import { getNewAmount, getNutritionValues } from "@/utils/nutritionHelpers";
import FoodNutritionDetail from "./FoodNutritionDetail";
import Link from "next/link";
import PieGraph from "@/components/PieGraph/PieGraph";
import React, { FC, useEffect, useState } from "react";

interface Props {
  food: Food;
  amount: number;
  scale: string;
}

const FoodNutrition: FC<Props> = ({ food, amount, scale }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [nutrients, setNutrients] = useState<FoodNutrients | null>(null);
  const scalesMerged = mergeScales(food);

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  const equivalentInGrams = getNewAmount(
    scalesMerged,
    scale,
    NutritionMeasurements.grams,
    amount
  );

  useEffect(() => {
    if (!food) return;
    const nutrientsUpdated = getNutritionValues(food, amount, scale);
    setNutrients(nutrientsUpdated);
  }, [amount, scale, food]);

  if (!nutrients) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full justify-center">
      {openDetails && (
        <FoodNutritionDetail
          nutrients={nutrients}
          handleClose={() => setOpenDetails(false)}
        />
      )}
      <div className="flex w-full  flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2">
            <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
            <span className="text-2xl font-semibold">Nutrition Values</span>
          </div>
          {food.source && (
            <div className="flex items-center gap-1">
              <span>Source:</span>
              <Link
                href={food.source}
                target="_blank"
                className="capitalize text-green-500 opacity-50 duration-300 hover:opacity-100"
              >
                {food.source.split(".")[1]}
              </Link>
            </div>
          )}
        </div>
        <PieGraph nutrients={nutrients} />
        <span className="opacity-50">
          {Number(equivalentInGrams?.toFixed(2))} grams
        </span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex w-full justify-between">
              <span>Calories:</span>
              <span>{nutrients.calories || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Carbs:</span>
              <span>{nutrients.carbohydrates || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Fats:</span>
              <span>{nutrients.fats || "-"}</span>
            </div>
            <div className="flex w-full justify-between">
              <span>Proteins:</span>
              <span>{nutrients.proteins || "-"}</span>
            </div>
          </div>
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

export default FoodNutrition;
