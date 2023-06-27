import { blurDataURL } from "@/components/Layout/BlurDataImage";
import { FC } from "react";
import { Food } from "@/features/foods/types";
import { formatTwoDecimals } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import AddToFavorite from "@/features/favorites/components/AddToFavorite";
import Image from "next/image";
import Link from "next/link";

interface Props {
  food: Food;
}

const FoodCard: FC<Props> = ({ food }) => {
  const { user } = useSelector(selectAuthSlice);
  if (!food.food_id || !user) return <></>;

  const isMyCreation = food.uploader_id === user.user_id;

  return (
    <Link
      href={`/app/food/${food.food_id}`}
      key={food.food_id}
      className="flex flex-col items-center overflow-auto rounded-lg border bg-white shadow-sm shadow-[#00000028] duration-300 hover:border-black/20 hover:shadow-xl dark:bg-slate-400/10 dark:hover:border-white/50 sm:max-w-[25rem] "
    >
      <span className="relative h-40 w-full border-b sm:h-40">
        <Image
          src={food.image}
          alt={`${food.food_name}`}
          fill
          blurDataURL={blurDataURL(160, 160)}
          className="object-cover"
        />
      </span>
      <div className="flex w-full flex-col break-words p-2 text-sm leading-5">
        <div className="flex h-2 items-center">
          {isMyCreation ? (
            <span className="text-xs text-green-500">My Creation</span>
          ) : (
            <span className="text-xs text-gray-500">Created by other user</span>
          )}
        </div>
        <div className="flex w-full items-center justify-between gap-1">
          <span className="truncate text-ellipsis text-center text-lg font-semibold">
            {food.food_name}
          </span>
          <AddToFavorite food={food} />
        </div>
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
    </Link>
  );
};

export default FoodCard;
