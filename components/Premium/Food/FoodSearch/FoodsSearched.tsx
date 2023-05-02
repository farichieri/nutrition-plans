import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";

interface Props {}

const FoodsSearched: FC<Props> = () => {
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const noData = Object.values(foodsSearched).length === 0;

  if (noData) {
    return <div>No Foods found with that name</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 sm:justify-start">
      {Object.keys(foodsSearched).map((key) => {
        const food = foodsSearched[key];
        return (
          <Link
            href={`/app/food/${food.food_id}`}
            key={food.food_id}
            className="flex flex-col gap-1 overflow-auto rounded-lg border shadow-sm shadow-[#00000028] duration-300 hover:scale-105 hover:shadow-xl dark:bg-slate-400/10"
          >
            <Image
              src={food.image}
              alt={`${food.food_name}`}
              width={200}
              height={200}
              className="h-[15rem] w-[15rem] object-cover"
            />
            <div className="flex w-full max-w-[15rem] flex-col break-words p-5">
              <span className="text-center text-lg font-semibold">
                {food.food_name}
              </span>
              <div className="flex w-full justify-between">
                <span>Calories:</span>
                <span>{food.nutrients.calories}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Carbs:</span>
                <span>{food.nutrients.carbohydrates}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Fats:</span>
                <span>{food.nutrients.fats}</span>
              </div>
              <div className="flex w-full justify-between">
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
