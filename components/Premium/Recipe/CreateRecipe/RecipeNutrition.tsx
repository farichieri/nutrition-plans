import { FC, useEffect, useState } from "react";
import { Food, FoodGroup, FoodNutrients } from "@/types/foodTypes";
import { getNutritionMerged } from "../../Food/useNutrition";
import { setRecipeState } from "@/store/slices/createRecipeSlice";
import { useDispatch } from "react-redux";
import FoodNutritionDetail from "../../Food/FoodNutritionDetail";
import PieGraph from "@/components/PieGraph/PieGraph";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  recipe: Food;
  foodIngredients: FoodGroup | null;
}

const RecipeNutrition: FC<Props> = ({ recipe, foodIngredients }) => {
  const dispatch = useDispatch();
  const [openDetails, setOpenDetails] = useState(false);
  const { nutrients, ingredients } = recipe;

  useEffect(() => {
    const nutritionMerged = getNutritionMerged(ingredients, foodIngredients);
    if (Object.keys(nutritionMerged).length > 0) {
      dispatch(setRecipeState({ ...recipe, nutrients: nutritionMerged }));
    }
  }, [foodIngredients, ingredients]);

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
      {openDetails && (
        <FoodNutritionDetail
          nutrients={nutrients}
          handleClose={() => setOpenDetails(false)}
        />
      )}
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
              {Number(nutrients.carbohydrates) - Number(nutrients.fiber) || "-"}
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

export default RecipeNutrition;
