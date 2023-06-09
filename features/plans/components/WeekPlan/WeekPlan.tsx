import { convertDateToDateString } from "../../utils/dates";
import { FC, useEffect } from "react";
import { fetchDietByDate } from "../../services";
import { getDaysOfWeek } from "@/utils/dateFormat";
import { selectPlansSlice, setDiet, setIsLoadingDiet } from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount, selectAuthSlice } from "@/features/authentication";
import Link from "next/link";
import ManualMeals from "../Manual/ManualMeals";
import PlanGenerator from "../common/PlanGenerator";
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
        <Spinner customClass="h-6 w-6 m-auto" />
      ) : (
        <div className="grid w-full gap-5 sm:grid-cols-fluid_lg">
          {!week && "Invalid Week"}
          {week?.map((date) => {
            const diet = diets[date];
            const dateF = convertDateToDateString(date);
            return (
              <div
                className="w-full rounded-md border bg-gray-500/10 p-2"
                key={date}
              >
                <div className="flex w-full justify-between">
                  <span className="text-xl font-semibold capitalize text-green-500">
                    {diet.plan_id?.replaceAll("-", " ")}
                  </span>
                  <Link href={`/app/${dateF}`}>
                    <span className="font-semibold capitalize text-red-500">
                      {dateF}
                    </span>
                  </Link>
                </div>
                {diet ? (
                  <div className="mb-auto flex flex-col gap-2">
                    <div className="grid w-full gap-10 sm:grid-cols-fluid_lg">
                      <div className="w-full">
                        <ManualMeals diet={diet} date={date} user={user} />
                      </div>
                      {/* {diet && (
                  <div className="w-full ">
                    <Nutrition nutrients={diet.diet_nutrition} />
                  </div>
                )} */}
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
