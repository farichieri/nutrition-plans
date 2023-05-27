import {
  fetchRandomFoodByPlan,
  getFoodsCollectionLength,
} from "@/firebase/helpers/Food";
import { DietMeal, DietMealGroup, DietMealGroupArr } from "@/types/dietTypes";
import { FC, useEffect, useState } from "react";
import { Food, FoodGroup } from "@/types/foodTypes";
import { PlansEnum, Result } from "@/types/types";
import { selectMealsSlice } from "@/store/slices/mealsSlice";
import { UserMealsArr } from "@/types/mealsSettingsTypes";
import { useSelector } from "react-redux";
import { uuidv4 } from "@firebase/util";
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
  const { meals } = useSelector(selectMealsSlice);
  const [dietMeals, setDietMeals] = useState<DietMealGroupArr>([]);
  const mealsArr: UserMealsArr = Object.values(meals).sort(
    (a, b) => a.order - b.order
  );

  const generateMeals = async (): Promise<Result<DietMealGroup, unknown>> => {
    try {
      const res = await getFoodsCollectionLength();
      if (res.result === "error") {
        throw new Error("Error fetching collLength");
      }
      const { data: collLength } = res;

      const loop = async (arr: UserMealsArr) => {
        const diet_meals: DietMealGroup = {};

        const promises = arr.map(async (meal) => {
          const uuid = uuidv4();
          const foodsFetched: FoodGroup = {};
          // Fetch 1 per meal
          const res = await fetchRandomFoodByPlan(planID, collLength);
          if (res.result === "error") {
            throw new Error("Error fetching food");
          }
          const food = res.data;
          if (!food.food_id) throw Error("No food_id provided");
          foodsFetched[food.food_id] = food;

          const newDietMeal: DietMeal = {
            diet_meal_name: meal.name,
            user_meal_id: meal.id,
            diet_meal_id: uuid,
            diet_meal_foods: foodsFetched,
            order: meal.order,
          };
          if (newDietMeal.diet_meal_id) {
            diet_meals[newDietMeal.diet_meal_id] = newDietMeal;
          }
        });
        await Promise.all(promises);
        return diet_meals;
      };

      const mealsGenerated = await loop(mealsArr);
      return { result: "success", data: mealsGenerated };
    } catch (error) {
      return { result: "error", error };
    }
  };

  const generate = async () => {
    const res = await generateMeals();
    if (res.result === "success") {
      const { data } = res;
      setDietMeals(Object.values(data));
    }
  };

  useEffect(() => {
    generate();
  }, []);

  if (dietMeals.length < 1) {
    return <>Generating Meals...</>;
  }

  return (
    <div>
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
