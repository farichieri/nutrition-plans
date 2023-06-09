import {
  Food,
  IngredientGroup,
  setRecipeState,
  setMealState,
  FoodNutritionDetail,
} from "@/features/foods";
import { AppRoutes } from "@/utils/routes";
import { FC, useEffect, useState } from "react";
import { getIngredientsFoods } from "@/utils/foodsHelpers";
import { getNutritionMerged } from "@/utils/nutritionHelpers";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import PieGraph from "@/components/PieGraph/PieGraph";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  food?: Food;
  meal?: Food;
  ingredients?: IngredientGroup;
}

const IngredientsNutrition: FC<Props> = ({ food, meal, ingredients }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openDetails, setOpenDetails] = useState(false);
  const nutrients = food?.nutrients || meal?.nutrients;
  const isCreateMeal = router.asPath === AppRoutes.create_meal;
  const isCreateRecipe = router.asPath === AppRoutes.create_recipe;

  useEffect(() => {
    if (isCreateMeal || isCreateRecipe) {
      if (!nutrients || !ingredients) return;
      const foods = getIngredientsFoods(ingredients);
      const nutritionMerged = getNutritionMerged(foods);
      if (Object.keys(nutritionMerged).length > 0) {
        if (isCreateRecipe && food) {
          dispatch(setRecipeState({ ...food, nutrients: nutritionMerged }));
        } else if (isCreateMeal && meal) {
          dispatch(setMealState({ ...meal, nutrients: nutritionMerged }));
        }
      }
    }
  }, [food?.ingredients, meal?.ingredients]);

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

export default IngredientsNutrition;
