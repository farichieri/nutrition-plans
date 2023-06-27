import { FC } from "react";
import { FilterQueries } from "@/types";
import { FoodGroup, getFoodsFiltered } from "@/features/foods";
import Image from "next/image";

interface Props {
  searchResult: FoodGroup;
  handleClick: Function;
  queries: FilterQueries;
}

const SearchedResults: FC<Props> = ({ searchResult, handleClick, queries }) => {
  const foods = getFoodsFiltered(searchResult, queries);
  return (
    <div className="max-w-screen-2xl select-none grid-cols-fluid_lg items-start justify-center gap-4 sm:grid sm:px-0 lg:justify-start">
      {foods.map((food) => {
        return (
          <div
            onClick={() => handleClick(food)}
            key={food.food_id}
            className="my-1 flex h-full w-full cursor-pointer items-start gap-1 overflow-auto rounded-md border"
          >
            <span className="relative h-20 w-full basis-1/5">
              <Image
                src={food.image}
                fill
                className="object-cover"
                alt={food.food_name || ""}
              />
            </span>
            <div className="flex h-full w-full basis-4/5 flex-col gap-1 p-2">
              <span className="text-lg font-semibold capitalize leading-4">
                {food.food_name}
              </span>
              <span className="text-xs capitalize text-green-500">
                {food.kind?.replaceAll("_", " ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchedResults;
