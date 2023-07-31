import { convertDateToDateString, convertDayToUrlDate } from "../../utils";
import { Diet, DietMeal } from "../../types";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import Link from "next/link";

import { formatTwoDecimals, getNutritionMerged } from "@/utils";
import { FoodGroupArray } from "@/features/foods";
import { FC } from "react";
import BlurImage from "@/components/blur-image";
import AddPlanToFavorites from "./AddPlanToFavorites";

interface Props {
  diet: Diet;
}

const PlanCard: FC<Props> = ({ diet }) => {
  const { user } = useSelector(selectAuthSlice);
  const { date } = diet;
  const isEditing = false;

  if (!date || !user) return <></>;

  const calories = diet?.nutrients?.calories;
  const urlDate = convertDayToUrlDate(date!);
  const dateF = convertDateToDateString({
    date,
    userStartOfWeek: user?.startOfWeek,
  });

  return (
    <div
      className={`flex w-full max-w-xl flex-col items-center justify-start gap-2 rounded-lg border bg-slate-200/50 p-2 dark:bg-gray-500/10 ${
        dateF === "today" ? "border-red-400/50" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between border-b  px-2 py-1">
        <Link href={`/app/${urlDate}`}>
          <span
            className={`flex py-1.5 font-semibold capitalize ${
              dateF === "today"
                ? "text-red-400 underline hover:text-red-500"
                : "text-blue-400 underline hover:text-blue-500"
            }`}
          >
            from: {dateF}
          </span>
        </Link>
        {calories && (
          <span className="text-xs opacity-70">{calories} calories</span>
        )}
        <AddPlanToFavorites diet={diet} />
      </div>
      {diet && (
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <span className="text-xl font-semibold capitalize text-green-500">
            {diet?.planID?.replaceAll("_", " ")}
          </span>
        </div>
      )}
      <div className="flex h-full min-h-[15rem] w-full flex-col gap-2">
        {Object.values(diet?.meals)
          .sort((a: any, b: any) => Number(a.order) - Number(b.order))
          .map((dietMeal: DietMeal) => {
            const nutritionMerged = getNutritionMerged(dietMeal.foods);
            const { calories } = nutritionMerged;
            const dietMealFoodsArr: FoodGroupArray = Object.values(
              dietMeal.foods
            ).sort((a, b) => a.order - b.order);
            return (
              <div
                key={dietMeal.id}
                className={`min-h-20 flex w-full flex-col overflow-auto rounded-xl border bg-white dark:bg-gray-500/20`}
              >
                <div
                  className={`flex items-center gap-5 bg-black/10 px-2 py-1 text-center`}
                >
                  <span className="text-xl font-semibold capitalize">
                    {dietMeal.name}
                  </span>
                  <span className="ml-auto text-xs opacity-50">
                    {calories} calories
                  </span>
                </div>

                <div
                  className={`w-full divide-y divide-green-500/10 overflow-hidden`}
                >
                  {dietMealFoodsArr.length < 1 && !isEditing ? (
                    <span className="m-2 flex h-10 text-sm opacity-50">
                      No foods planned yet.
                    </span>
                  ) : (
                    dietMealFoodsArr.map((food, index) => {
                      if (!food.id) return <></>;
                      const scaleFormatted = formatTwoDecimals(
                        food.scaleAmount
                      );

                      return (
                        <div
                          className={`flex w-full items-center gap-1 px-0 hover:bg-slate-500/20  active:bg-slate-500/50 `}
                        >
                          <Link
                            key={food.id}
                            className="flex w-full"
                            href={`/app/food/${food.id}?amount=${food.scaleAmount}&scale=${food.scaleName}`}
                          >
                            <div
                              className={`flex w-full gap-1 ${
                                food.isEaten ? "" : ""
                              }`}
                            >
                              <span className="relative h-16 w-16 min-w-[64px] sm:h-16 sm:w-16">
                                <BlurImage
                                  image={{
                                    imageURL: food.imageURL,
                                    title: food.name!,
                                    id: food.id!,
                                  }}
                                />
                              </span>
                              <div className="flex h-auto w-full pr-2">
                                <div className="flex h-full w-full flex-col py-1">
                                  <div className="flex w-full max-w-max flex-col ">
                                    <span className="text-base font-semibold capitalize leading-4 tracking-tight">
                                      {food.name}
                                    </span>
                                    {/* <span className="text-sm opacity-50">{food.description}</span> */}
                                  </div>
                                  <div className="flex h-full flex-col">
                                    <div className="mt-auto  flex w-full flex-wrap items-baseline gap-1">
                                      <span className="text-sm">
                                        {scaleFormatted}
                                      </span>
                                      <span className="text-sm lowercase">
                                        {`${food.scaleName.toLowerCase()}${
                                          scaleFormatted > 1 ? "" : ""
                                        }`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlanCard;
