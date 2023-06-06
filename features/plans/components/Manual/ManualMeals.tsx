import { FC } from "react";
import { Food } from "@/features/foods";
import { selectAuthSlice } from "@/features/authentication/slice";
import { selectPlansSlice, DietMeal, MealCard } from "@/features/plans";
import { useSelector, useDispatch } from "react-redux";

interface Props {}

const ManualMeals: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { dietOpened } = useSelector(selectPlansSlice);
  const dietMeals = dietOpened?.diet_meals;

  console.log({ dietMeals });

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="material-icons-outlined text-green-500">
          restaurant
        </span>
        <span className="text-2xl font-semibold">Meals</span>
      </div>
      {dietMeals && (
        <div className="flex flex-col gap-2">
          {Object.values(dietMeals)
            .sort((a: any, b: any) => Number(a.order) - Number(b.order))
            .map((meal: DietMeal) => {
              const mealKcals: number = Object.values(
                meal.diet_meal_foods
              ).reduce(
                (acc: number, curr: Food) =>
                  acc + Number(curr.nutrients.calories),
                0
              );
              return (
                <>
                  <MealCard meal={meal} mealKcals={mealKcals} />
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ManualMeals;
