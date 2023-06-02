import { FC, useState } from "react";
import { FoodNutrients } from "@/features/foods";
import { formatToFixed } from "@/utils/format";
import FoodNutritionDetail from "./FoodNutritionDetail";
import PieGraph from "@/components/PieGraph/PieGraph";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/features/authentication";

interface Props {
  nutrients: FoodNutrients;
}

// This component should receive props, to be easy-reusable.
// And I'm not sure If I want to me modifying the scale. Or just render the results and have another copmonent for the modifies.

const Nutrition: FC<Props> = ({ nutrients }) => {
  const { user } = useSelector(selectAuthSlice);
  const nutrition_targets = user?.nutrition_targets;
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetail = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenDetails(true);
  };

  if (!nutrients) {
    return <div>No Nutrients Found.</div>;
  }

  return (
    <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-10">
      {openDetails && (
        <FoodNutritionDetail
          nutrients={nutrients}
          handleClose={() => setOpenDetails(false)}
        />
      )}
      <div className="flex w-full max-w-lg flex-col gap-0">
        <div className="mb-4 flex items-center gap-2">
          <span className="material-icons-outlined text-green-500">
            data_usage
          </span>
          <span className="text-2xl font-semibold">Nutrition Values</span>
        </div>
        <PieGraph nutrients={nutrients} />
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex w-full items-baseline justify-between">
                  <span className="basis-1/3">Calories:</span>
                  <div className="flex basis-1/2 justify-end text-xs text-green-300">
                    {"("}
                    {nutrition_targets?.calories}
                    {")"}
                  </div>
                  <span className="flex basis-1/12 justify-end">
                    {nutrients.calories || "-"}
                  </span>
                </div>
                <div className="flex w-full items-baseline justify-between">
                  <span className="basis-1/3">Carbs:</span>
                  <div className="flex basis-1/2 justify-end text-xs text-green-300">
                    {"("}
                    {nutrition_targets?.carbohydrates.min}-
                    {nutrition_targets?.carbohydrates.max}
                    {")"}
                  </div>
                  <span className="flex basis-1/12 justify-end">
                    {nutrients.carbohydrates || "-"}
                  </span>
                </div>
                <div className="flex w-full items-baseline justify-between">
                  <span className="basis-1/3">Fats:</span>
                  <div className="flex basis-1/2 justify-end text-xs text-green-300">
                    {"("}
                    {nutrition_targets?.fats.min}-{nutrition_targets?.fats.max}
                    {")"}
                  </div>
                  <span className="flex basis-1/12 justify-end">
                    {nutrients.fats || "-"}
                  </span>
                </div>
                <div className="flex w-full items-baseline justify-between">
                  <span className="basis-1/3">Proteins:</span>
                  <div className="flex basis-1/2 justify-end text-xs text-green-300">
                    {"("}
                    {nutrition_targets?.proteins.min}-
                    {nutrition_targets?.proteins.max}
                    {")"}
                  </div>
                  <span className="flex basis-1/12 justify-end">
                    {nutrients.proteins || "-"}
                  </span>
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
