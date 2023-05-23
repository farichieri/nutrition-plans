import { Diet, DietMeal } from "@/types/dietTypes";
import { FC, useEffect } from "react";
import { Food } from "@/types/foodTypes";
import { PlansEnum } from "@/types/types";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectPlansSlice, setDietOpened } from "@/store/slices/plansSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  planID: PlansEnum;
}

const DayPlan: FC<Props> = ({ planID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { date, dietOpened, plans } = useSelector(selectPlansSlice);
  const isFree = user?.premium_plan === "free";

  useEffect(() => {
    dispatch(setDietOpened(null));
    const dietFiltered: Diet = plans[planID][date];
    if (dietFiltered) {
      dispatch(setDietOpened(dietFiltered));
    } else {
      dispatch(setDietOpened(null));
    }
  }, [date, plans, planID]);

  return (
    <>
      {!dietOpened ? (
        <div className="m-auto flex flex-col items-center justify-center gap-1">
          <span className="text-xl">Generating Plan</span>
          <Spinner customClass="h-10 w-10 " />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-start gap-10">
          <div
            className={`${
              isFree &&
              "z-50 flex h-full w-full max-w-5xl cursor-auto select-none flex-col gap-5"
            } max-w-5xl`}
          >
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-green-500">
                restaurant
              </span>
              <span className="text-2xl font-semibold">Meals</span>
            </div>
            {Object.values(dietOpened.diet_meals)
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
                        {meal.diet_meal_type}
                      </span>
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
                              className="h-[100px] w-[100px] min-w-[100px] max-w-[100px] object-cover"
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
        </div>
      )}
    </>
  );
};
export default DayPlan;
