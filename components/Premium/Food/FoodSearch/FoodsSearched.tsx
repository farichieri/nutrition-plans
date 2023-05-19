import { FC } from "react";
import { FoodKind } from "@/types/foodTypes";
import { Meal } from "@/types/mealTypes";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

interface MealProps {
  meal: Meal;
}

const Meal: FC<MealProps> = ({ meal }) => {
  const mealFoods = meal.ingredients;
  return (
    <div className="flex h-64 w-full cursor-pointer flex-col items-start rounded-md border">
      <div className="flex w-full flex-col divide-y">
        {Object.keys(mealFoods).map((food_id) => {
          const food = mealFoods[food_id].food;
          return (
            <div key={food_id} className="flex h-full w-full gap-2 ">
              <span className="relative h-auto w-full basis-1/2 ">
                <Image
                  src={food.image}
                  fill
                  className="object-cover"
                  alt={food.food_name || ""}
                />
              </span>
              <div className="flex w-full basis-1/2 flex-col">
                <span className="text-lg font-semibold capitalize">
                  {food.food_name}
                </span>
                <span className="text-xs opacity-50">
                  {food.food_description}
                </span>
                <span className="text-xs text-green-500">{food.kind}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Props {}

const FoodsSearched: FC<Props> = () => {
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const noData = Object.values(foodsSearched).length === 0;

  if (noData) {
    return <div>No Foods found with that name</div>;
  }

  return (
    <div className="grid select-none grid-cols-fluid gap-4 px-4 sm:px-0">
      {Object.keys(foodsSearched).map((key) => {
        const food = foodsSearched[key];
        return (
          <Link
            href={`/app/food/${food.food_id}`}
            key={food.food_id}
            className="flex flex-col items-center overflow-auto rounded-lg border bg-white shadow-sm shadow-[#00000028] duration-300 hover:border-black/20 hover:shadow-xl dark:bg-slate-400/10 dark:hover:border-white/50 sm:max-w-xs"
          >
            {food.kind === FoodKind.meal ? (
              <Meal meal={food} />
            ) : (
              <span className="relative h-64 w-full">
                <Image
                  src={food.image}
                  alt={`${food.food_name}`}
                  fill
                  className="object-cover"
                />
              </span>
            )}
            <div className="flex w-full flex-col break-words p-2">
              <span className="text-center text-lg font-semibold">
                {food.food_name}
              </span>
              <div className="flex w-full justify-between">
                <span>Calories:</span>
                <span>{food.nutrients.calories}</span>
              </div>
              <div className="flex w-full justify-between text-[var(--carbs-color)]">
                <span>Carbs:</span>
                <span>{food.nutrients.carbohydrates}</span>
              </div>
              <div className="flex w-full justify-between text-[var(--fats-color)]">
                <span>Fats:</span>
                <span>{food.nutrients.fats}</span>
              </div>
              <div className="flex w-full justify-between text-[var(--prots-color)]">
                <span>Proteins:</span>
                <span>{food.nutrients.proteins}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FoodsSearched;
