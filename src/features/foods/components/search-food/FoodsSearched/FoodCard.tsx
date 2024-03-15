import { AddFoodToLibrary } from "@/features/library";
import { FC } from "react";
import { FoodHit } from "@/features/foods/types";
import { formatTwoDecimals } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

interface Props {
  food: FoodHit;
}

const FoodCard: FC<Props> = ({ food }) => {
  const { user } = useSelector(selectAuthSlice);
  if (!food.id || !user) return <></>;

  return (
    <Link
      href={`/app/food/${food.id}`}
      key={food.id}
      className="group flex w-full flex-row items-center overflow-auto rounded-xl  bg-white shadow-md shadow-[#00000028] duration-300 hover:border-black/20 hover:shadow-xl hover:shadow-[#00000040] active:bg-slate-200 dark:bg-slate-400/10 dark:hover:border-white/50 dark:active:bg-slate-500/50 sm:max-h-[25rem] sm:max-w-[20rem] sm:flex-col "
    >
      <Image
        src={food.imageURL}
        alt={food.name!}
        width={400}
        height={400}
        className="flex h-24 max-h-[96px] w-full max-w-[96px] object-cover sm:h-36 sm:max-h-full sm:max-w-full"
      />
      <div className="flex h-full w-full flex-col gap-0.5 overflow-hidden break-words px-2 text-sm sm:py-2">
        <div className="flex w-full items-center justify-between gap-1">
          <span className="truncate text-ellipsis text-center text-lg font-semibold">
            {food.name}
          </span>
          <AddFoodToLibrary food={food} />
        </div>
        <div className="text-xs leading-3">
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
    </Link>
  );
};

export default FoodCard;
