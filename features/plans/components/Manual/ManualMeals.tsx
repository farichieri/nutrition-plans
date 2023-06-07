import {
  DietMeal,
  MealCard,
  Diet,
  selectPlansSlice,
  setIsEditingDiet,
} from "@/features/plans";
import { FC } from "react";
import { Food } from "@/features/foods";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  dietOpened: Diet;
}
const ManualMeals: FC<Props> = ({ dietOpened }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { isEditingDiet } = useSelector(selectPlansSlice);
  const dietMeals = dietOpened?.diet_meals;

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="material-icons-outlined text-green-500">
          restaurant
        </span>
        <span className="text-2xl font-semibold">Meals</span>
        <button
          className="ml-auto rounded-md border px-3 py-1"
          onClick={() => dispatch(setIsEditingDiet(!isEditingDiet))}
        >
          {isEditingDiet ? "Stop Editing" : "Edit"}
        </button>
      </div>
      {dietMeals && (
        <div className="flex flex-col gap-2">
          {Object.values(dietMeals)
            .sort((a: any, b: any) => Number(a.order) - Number(b.order))
            .map((dietMeal: DietMeal) => {
              const mealKcals: number = Object.values(
                dietMeal.diet_meal_foods
              ).reduce(
                (acc: number, curr: Food) =>
                  acc + Number(curr.nutrients.calories),
                0
              );
              return (
                <MealCard
                  dietMeal={dietMeal}
                  mealKcals={mealKcals}
                  dietOpened={dietOpened}
                  key={dietMeal.diet_meal_id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ManualMeals;
