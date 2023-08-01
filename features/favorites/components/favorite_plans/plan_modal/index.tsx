import {
  Diet,
  DietMeal,
  Nutrition,
  convertDateToDateString,
  convertDayToUrlDate,
} from "@/features/plans";
import { FC } from "react";
import { FoodGroupArray } from "@/features/foods";
import { formatTwoDecimals, getNutritionMerged } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import AddPlanToFavorites from "@/features/plans/components/common/AddPlanToFavorites";
import BlurImage from "@/components/blur-image";
import Link from "next/link";
import { VaulDrawer } from "@/components";

interface Props {
  diet: Diet;
}

const PlanModal: FC<Props> = ({ diet }) => {
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
    <VaulDrawer btnText="Open">
      <div
        className={`flex w-full max-w-xl flex-col items-center justify-start gap-2 overflow-y-auto p-2 ${
          dateF === "today" ? "border-red-400/50" : ""
        }`}
      >
        <div className="flex w-full items-center border-b px-2 py-1">
          {diet && (
            <span className="mr-auto text-xl font-semibold capitalize text-green-500">
              {diet?.planID?.replaceAll("_", " ")}
            </span>
          )}
          {calories && (
            <span className="px-4 text-xs opacity-70">{calories} calories</span>
          )}
          <AddPlanToFavorites diet={diet} />
        </div>
        <div className="flex h-auto w-full flex-col gap-2">
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
                  className={` flex h-auto w-full flex-col overflow-auto rounded-xl border bg-white dark:bg-gray-500/20`}
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
        <Nutrition nutrients={diet.nutrients} planID={diet.planID} />
      </div>
    </VaulDrawer>
  );
};

export default PlanModal;
