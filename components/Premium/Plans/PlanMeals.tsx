import { buildDiet, generateMeals } from "@/utils/planHelper";
import { DietMeal, DietMealGroupArr } from "@/types/dietTypes";
import { FC, useEffect, useState } from "react";
import { Food } from "@/types/foodTypes";
import { PlansEnum } from "@/types/types";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectMealsSlice } from "@/store/slices/mealsSlice";
import { selectPlansSlice, setDietOpened } from "@/store/slices/plansSlice";
import { UserMealsArr } from "@/types/mealsSettingsTypes";
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
  const { meals } = useSelector(selectMealsSlice);
  const [dietMeals, setDietMeals] = useState<DietMealGroupArr>([]);
  const nutrition_targets = user?.nutrition_targets;
  const userMealsArr: UserMealsArr = Object.values(meals).sort(
    (a, b) => a.order - b.order
  );
  const { date, dietOpened, plans } = useSelector(selectPlansSlice);

  console.log({ nutrition_targets });
  const generate = async () => {
    if (!nutrition_targets) return;
    const res = await generateMeals(planID, userMealsArr, nutrition_targets);
    if (res.result === "success") {
      const { data } = res;
      setDietMeals(Object.values(data));
    }
  };

  useEffect(() => {
    generate();
  }, []);

  useEffect(() => {
    if (dietMeals.length > 0) {
      const diet = buildDiet(dietMeals, planID);
      dispatch(setDietOpened(diet));
    }
  }, [dietMeals]);

  // useEffect(() => {
  //   dispatch(setDietOpened(null));
  //   const dietFiltered: Diet = plans[planID][date];
  //   if (dietFiltered) {
  //     dispatch(setDietOpened(dietFiltered));
  //   } else {
  //     dispatch(setDietOpened(null));
  //   }
  // }, [date, plans, planID]);

  if (dietMeals.length < 1) {
    return <>Generating Meals...</>;
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="material-icons-outlined text-green-500">
          restaurant
        </span>
        <span className="text-2xl font-semibold">Meals</span>
      </div>
      <button
        className="m-1 rounded-md border border-red-500 px-3 py-1"
        onClick={() => generate()}
      >
        Re-Generate
      </button>
      <div className="flex flex-col gap-2">
        {dietMeals
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
  );
};

export default PlanMeals;
