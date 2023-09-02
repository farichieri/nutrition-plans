import {
  Food,
  orderScales,
  NutritionMeasurements,
  NutrientsT,
} from "@/features/foods";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { formatToFixed } from "@/utils/format";
import { getNewAmount, getNutritionValues } from "@/utils/nutritionHelpers";
import { USDAIcon } from "@/assets";
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
  const [nutrients, setNutrients] = useState<NutrientsT | null>(null);
  const scalesMerged = orderScales({ scales: food.scales });

  const equivalentInGrams = getNewAmount({
    scales: scalesMerged,
    prev_scale_name: scale,
    new_scale_name: NutritionMeasurements.grams,
    scaleAmount: amount,
  });

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
      <div className="flex w-full  flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2">
            <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
            <span className="text-2xl font-semibold">Nutrition Targets</span>
          </div>
          {food.source && (
            <div className="flex items-center gap-1">
              <span>Source:</span>
              <Link
                href={"https://fdc.nal.usda.gov/"}
                target="_blank"
                className="capitalize text-green-500 opacity-50 duration-300 hover:opacity-100"
              >
                <USDAIcon customClass="h-6 w-6" />
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
            <span>{formatToFixed(Number(nutrients.fiber)) || "-"}</span>
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
            <span>{formatToFixed(Number(nutrients.sodium)) || "-"}</span>
          </div>
          <div className="flex w-full justify-between">
            <span>Cholesterol:</span>
            <span>{formatToFixed(Number(nutrients.cholesterol)) || "-"}</span>
          </div>
        </div>
        <FoodNutritionDetail title={food.name!} nutrients={nutrients} />
      </div>
    </div>
  );
};

export default FoodNutrition;
