import { FC } from "react";
import { Food } from "@/features/foods/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  food: Food;
}

const FoodCard: FC<Props> = ({ food }) => {
  if (!food.food_id) return <></>;
  return (
    <Link
      href={`/app/food/${food.food_id}`}
      key={food.food_id}
      className="flex flex-col items-center overflow-auto rounded-lg border bg-white shadow-sm shadow-[#00000028] duration-300 hover:border-black/20 hover:shadow-xl dark:bg-slate-400/10 dark:hover:border-white/50 sm:max-w-[25rem] "
    >
      <span className="relative h-56 w-full">
        <Image
          src={food.image}
          alt={`${food.food_name}`}
          fill
          className="object-cover"
        />
      </span>
      <div className="flex w-full flex-col break-words p-2">
        <span className="text-ellipsi truncate text-center text-lg font-semibold">
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
};

export default FoodCard;
