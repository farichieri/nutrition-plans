import { selectPlansSlice, DietMeal } from "@/features/plans";
import { FC } from "react";
import { Food } from "@/features/foods";
import { PlansEnum } from "@/types";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";

interface MealProps {}
const Meal: FC<MealProps> = () => {
  return <div> </div>;
};

interface Props {
  planID: PlansEnum;
}

const PlanMeals: FC<Props> = ({ planID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { dietOpened } = useSelector(selectPlansSlice);
  const dietMeals = dietOpened?.diet_meals;

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
                <div
                  key={meal.diet_meal_id}
                  className="min-h-20 flex w-full flex-col overflow-auto rounded-md border "
                >
                  <div className="flex items-center gap-5 border-b px-2 py-1 text-center">
                    <span className="font-semibold capitalize">
                      {meal.diet_meal_name}
                    </span>
                    <div className="flex w-full flex-col text-left">
                      <span className="text-blue-500">
                        Meal Complexity: {meal.complexity}
                      </span>
                      <span className="text-yellow-500">
                        Meal Time: {meal.time}
                      </span>
                    </div>
                    <span className="ml-auto text-xs opacity-50">
                      {mealKcals} calories
                    </span>
                    <div className="flex items-center">
                      {/* Eaten */}
                      <span className="material-icons">
                        radio_button_unchecked
                      </span>
                    </div>
                  </div>
                  <div>
                    {Object.keys(meal.diet_meal_foods).map((food_id) => {
                      const food: Food = meal.diet_meal_foods[food_id];
                      return (
                        <Link
                          key={food_id}
                          className="flex divide-y"
                          href={`/app/food/${food_id}?amount=${food.scale_amount}&scale=${food.scale_name}`}
                        >
                          <Image
                            src={food.image}
                            height={150}
                            width={150}
                            alt={food.food_name || ""}
                            className="h-[130px] w-[130px] min-w-[130px] max-w-[130px] object-cover"
                          />
                          <div className="flex w-full p-2">
                            <div className="flex w-full flex-col">
                              <div className="">
                                <span>{food.food_name}</span>
                              </div>
                              <div className="">
                                <span className="text-xs opacity-50">
                                  {food.food_description}
                                </span>
                              </div>
                              <div className="flex gap-1 text-xs capitalize">
                                <span>{food.scale_amount}</span>
                                <span>{food.scale_name}</span>
                              </div>
                              <span className="text-blue-500">
                                Food Complexity: {food.complexity}
                              </span>
                              <span className="text-yellow-500">
                                Food Time: {food.prep_time + food.cook_time}
                              </span>
                            </div>
                            <div className="my-auto flex">
                              <div>
                                {/* Eaten */}
                                <span className="material-icons md-20">
                                  radio_button_unchecked
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default PlanMeals;
