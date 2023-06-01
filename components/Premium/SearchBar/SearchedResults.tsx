import { FC } from "react";
import { FoodGroup } from "@/features/foods";
import Image from "next/image";

interface Props {
  searchResult: FoodGroup;
  handleClick: Function;
}

const SearchedResults: FC<Props> = ({ searchResult, handleClick }) => {
  return (
    <div className="flex flex-col gap-5">
      {Object.keys(searchResult).map((food) => {
        return (
          <div
            onClick={() => handleClick(searchResult[food])}
            key={food}
            className="flex h-full cursor-pointer items-start gap-1 overflow-auto rounded-md border"
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
    </div>
  );
};

export default SearchedResults;
