import { FC } from "react";
import { FoodGroup, FoodKind } from "@/types/foodTypes";
import { Meal } from "@/types/mealTypes";
import Image from "next/image";

interface MealProps {
  meal: Meal;
}

const Meal: FC<MealProps> = ({ meal }) => {
  const mealFoods = meal.ingredients;
  return (
    <div
      // onClick={() => handleClick(meal)}
      className="flex h-full cursor-pointer flex-col items-start rounded-md border"
    >
      <div className="flex h-full w-full flex-col items-center border-b p-2">
        <span className="text-lg font-semibold capitalize">
          {meal.food_name}
        </span>
        <span className="text-xs opacity-50">{meal.food_description}</span>
        <span className="text-xs text-green-500">{meal.kind}</span>
      </div>
      <div className="flex w-full flex-col divide-y">
        {Object.keys(mealFoods).map((food_id) => {
          const food = mealFoods[food_id].food;
          return (
            <div key={food_id} className="flex h-full w-full gap-2 ">
              <Image
                src={food.image}
                height={100}
                width={100}
                alt={food.food_name || ""}
                className="h-[100px] min-h-[100px] w-[100px] min-w-[100px] object-cover"
              />
              <div className="flex flex-col">
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

interface Props {
  searchResult: FoodGroup;
  handleClick: Function;
}

const SearchedResults: FC<Props> = ({ searchResult, handleClick }) => {
  return (
    <>
      {Object.keys(searchResult).map((food) => {
        return searchResult[food].kind === FoodKind.meal ? (
          <Meal meal={searchResult[food]} />
        ) : (
          <div
            onClick={() => handleClick(searchResult[food])}
            key={food}
            className="flex h-full cursor-pointer items-start gap-1 rounded-md border"
          >
            <Image
              src={searchResult[food].image}
              height={100}
              width={100}
              alt={searchResult[food].food_name || ""}
              className="h-[100px] min-h-[100px] w-[100px] min-w-[100px] object-cover"
            />
            <div className="flex h-full w-full flex-col p-2">
              <span className="text-lg font-semibold capitalize">
                {searchResult[food].food_name}
              </span>
              <span className="text-xs opacity-50">
                {searchResult[food].food_description}
              </span>
              <span className="text-xs text-green-500">
                {searchResult[food].kind}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchedResults;
