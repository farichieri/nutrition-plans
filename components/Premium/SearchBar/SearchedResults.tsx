import { AddFoodToLibrary } from "@/features/library";
import { FC } from "react";
import { FilterQueries } from "@/types";
import { FoodGroup, getFoodsFiltered } from "@/features/foods";
import { formatTwoDecimals } from "@/utils";
import BlurImage from "@/components/blur-image";

interface Props {
  searchResult: FoodGroup;
  handleClick: Function;
  queries: FilterQueries;
}

const SearchedResults: FC<Props> = ({ searchResult, handleClick, queries }) => {
  const foods = getFoodsFiltered(searchResult, queries);
  return (
    <div className="flex max-w-screen-2xl select-none grid-cols-fluid flex-col items-start justify-center gap-1 sm:grid sm:px-0 lg:justify-start">
      {foods.map((food) => {
        return (
          <div
            onClick={() => handleClick(food)}
            key={food.id}
            className="group flex w-full cursor-pointer flex-row items-center overflow-auto rounded-xl border bg-white shadow-sm shadow-[#00000028] duration-300 hover:border-black/20 hover:shadow-xl active:bg-slate-200 dark:bg-slate-400/10 dark:hover:border-white/50 dark:active:bg-slate-500/50 sm:max-h-[25rem] sm:max-w-[20rem] sm:flex-col "
          >
            <span className="flex h-full  max-h-[105px] w-full max-w-[105px] sm:max-h-full sm:max-w-full">
              <BlurImage
                image={{
                  imageURL: food.imageURL,
                  title: food.name!,
                  id: food.id!,
                }}
              />
            </span>
            <div className="flex h-full w-full flex-col gap-0.5 overflow-hidden break-words px-2 py-0.5 text-sm">
              <div className="flex w-full items-center justify-between gap-1">
                <span className="truncate text-ellipsis text-center text-lg font-semibold">
                  {food.name}
                </span>
                <AddFoodToLibrary food={food} />
              </div>
              <div className="text-xs leading-4">
                <div className="flex w-full justify-between opacity-70">
                  <span>Calories:</span>
                  <span>{food.nutrients.calories}</span>
                </div>
                <div className="flex w-full justify-between text-[var(--carbs-color)]">
                  <span>Carbs:</span>
                  <span>{formatTwoDecimals(food.nutrients.carbohydrates)}</span>
                </div>
                <div className="flex w-full justify-between text-[var(--fats-color)]">
                  <span>Fats:</span>
                  <span>{formatTwoDecimals(food.nutrients.fats)}</span>
                </div>
                <div className="flex w-full justify-between text-[var(--prots-color)]">
                  <span>Proteins:</span>
                  <span>{formatTwoDecimals(food.nutrients.proteins)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchedResults;
