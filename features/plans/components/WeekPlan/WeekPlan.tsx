import {
  convertDateToDateString,
  convertDayToUrlDate,
  fetchDietByDate,
  selectPlansSlice,
  setDiet,
  setIsLoadingDiet,
  ManualMeals,
  Nutrition,
  PlanGenerator,
} from "@/features/plans";
import { FC, useEffect } from "react";
import { getDaysOfWeek } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount, selectAuthSlice } from "@/features/authentication";
import Link from "next/link";

import Spinner from "@/components/Loader/Spinner";

interface Props {
  dateInterval: string;
}

const WeekPlan: FC<Props> = ({ dateInterval }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { diets, isLoadingDiet } = useSelector(selectPlansSlice);
  const week = getDaysOfWeek(dateInterval);

  const getDayDiet = async (date: string, user: UserAccount) => {
    dispatch(setIsLoadingDiet(true));
    const res = await fetchDietByDate({ date, user });
    if (res.result === "success") {
      dispatch(setDiet(res.data));
    }
    dispatch(setIsLoadingDiet(false));
  };

  const getWeekDiets = async () => {
    if (!user) return;
    week?.forEach((day) => {
      getDayDiet(day, user);
    });
  };

  const createWeekDiets = () => {};

  useEffect(() => {
    if (user) {
      getWeekDiets();
    }
  }, [dateInterval]);

  if (!user) return <></>;
  return (
    <div className="w-full">
      {isLoadingDiet ? (
        <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
          <Spinner customClass="h-6 w-6 m-auto" />
        </div>
      ) : (
        <div className="grid w-full gap-5 sm:grid-cols-fluid_lg">
          {!week && "Invalid Week"}
          {week?.map((date) => {
            const diet = diets[date];
            const dateF = convertDateToDateString(date);
            const urlDate = convertDayToUrlDate(date);
            const planID = diet?.plan_id;

            return (
              <div
                className="flex w-full flex-col items-center justify-center gap-2 rounded-sm border bg-gray-500/10 p-2"
                key={date}
              >
                <div className="flex w-full items-center justify-between border-b pb-1">
                  <Link href={`/app/${urlDate}`}>
                    <span className="mb-1 flex rounded-3xl border border-blue-500 bg-blue-500/50 px-2 py-1.5 font-semibold capitalize text-white hover:bg-blue-500/70">
                      {dateF}
                    </span>
                  </Link>
                  <span className="text-xl font-semibold capitalize text-green-500">
                    {diet?.plan_id?.replaceAll("_", " ")}
                  </span>
                </div>
                {diet ? (
                  <div className="mb-auto flex h-full w-full flex-col gap-2">
                    <div className="flex h-full w-full flex-wrap justify-between gap-10 ">
                      <div className="flex w-full">
                        <ManualMeals diet={diet} date={date} user={user} />
                      </div>
                      {diet && (
                        <div className="flex w-full items-end">
                          <Nutrition
                            nutrients={diet.diet_nutrition}
                            planID={planID}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="m-auto flex justify-center">
                    <PlanGenerator date={date} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeekPlan;
