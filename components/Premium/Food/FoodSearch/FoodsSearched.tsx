import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import Link from "next/link";

interface Props {}

const FoodsSearched: FC<Props> = () => {
  const { foodsSearched } = useSelector(selectFoodsSlice);

  useEffect(() => {}, []);
  console.log({ foodsSearched });
  if (!foodsSearched) {
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
            className="flex flex-col gap-1 overflow-auto rounded-lg bg-slate-500/20 shadow-sm shadow-[#00000028] duration-300 hover:shadow-lg"
          >
            <Image
              src={food.image}
              alt={`${food.food_name}`}
              width={200}
              height={200}
              className="w-50"
            />
            <div className="flex flex-col p-5">
              <span className="text-center text-xl font-semibold">
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
