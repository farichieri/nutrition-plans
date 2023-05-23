import { Food, FoodNutrients } from "@/types/foodTypes";
import { formatToFixed } from "@/utils/format";
import { getNutritionValues } from "./nutritionHelpers";
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

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  useEffect(() => {
    if (!food) return;
    const nutrientsUpdated = getNutritionValues(food, amount, scale);
    setNutrients(nutrientsUpdated);
  }, [amount, scale, food]);

  if (!nutrients) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full max-w-xl items-center justify-center">
      {openDetails && (
        <FoodNutritionDetail
          nutrients={nutrients}
          handleClose={() => setOpenDetails(false)}
        />
      )}
      <div className="flex w-full max-w-lg flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2">
            <span className="material-icons-outlined text-green-500">
              data_usage
            </span>
            <span className="text-2xl font-semibold">Nutrition Values</span>
          </div>
          {food.source && (
            <div className="flex items-center gap-1">
              <span>Source:</span>
              <Link
                href={"https://www.usda.gov/"}
                target="_blank"
                className="text-green-500 opacity-50 duration-300 hover:opacity-100"
              >
                {food.source}
              </Link>
            </div>
          )}
        </div>
        <PieGraph nutrients={nutrients} />
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
