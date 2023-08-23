import { convertDateToDateString, convertDayToUrlDate } from "../../utils";
import { FC, useEffect, useState } from "react";
import { fetchDietByDate } from "../../services";
import { ManualMeals } from "..";
import { selectPlansSlice, setDiet } from "@/features/plans/slice";
import { useDispatch, useSelector } from "react-redux";
import { User, selectAuthSlice } from "@/features/authentication";
import DayNote from "./DayNote";
import Link from "next/link";
import PlanGenerator from "./PlanGenerator";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  date: string;
  setPlanBeingEdited: (date: string | null) => void;
}

const Plan: FC<Props> = ({ date, setPlanBeingEdited }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingDiet, setIsLoadingDiet] = useState(false);
  const { diets } = useSelector(selectPlansSlice);
  const { user } = useSelector(selectAuthSlice);
  const diet = diets[date];

  const getDayDiet = async (date: string, user: User) => {
    if (!diet) {
      setIsLoadingDiet(true);
    }
    const res = await fetchDietByDate({ date, userID: user.id });
    if (res.result === "success") {
      dispatch(setDiet(res.data));
    }
    setIsLoadingDiet(false);
  };

  useEffect(() => {
    if (user) {
      getDayDiet(date, user);
    }
  }, [date]);

  useEffect(() => {
    if (isEditing) {
      setPlanBeingEdited(date);
    } else {
      setPlanBeingEdited(null);
    }
  }, [isEditing]);

  if (!user) return <></>;

  const calories = diet?.nutrients?.calories;
  const urlDate = convertDayToUrlDate(date);
  const dateF = convertDateToDateString({
    date,
    userStartOfWeek: user?.startOfWeek,
  });

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-start gap-2 overflow-auto rounded-lg border bg-slate-300/40 p-2 dark:bg-gray-500/10 ${
        dateF === "today" ? "border-red-400/50" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between border-b px-2 pb-1.5">
        <Link href={`/app/${urlDate}`}>
          <span
            className={`flex font-semibold capitalize ${
              dateF === "today"
                ? "text-red-400 underline hover:text-red-500"
                : "text-blue-400 underline hover:text-blue-500"
            }`}
          >
            {dateF}
          </span>
        </Link>
        {calories && (
          <span className="text-xs opacity-70">{calories} calories</span>
        )}
        {!diet && <span className="text-xs text-red-500">Empty</span>}
      </div>
      {diet && (
        <div className="flex w-full items-baseline">
          <span className="text-xl font-semibold capitalize text-green-500">
            {diet?.planID?.replaceAll("_", " ")}
          </span>
        </div>
      )}
      {diet && <DayNote diet={diet} isEditing={isEditing} />}
      <div className="flex h-full min-h-[10rem] w-full flex-col">
        {isLoadingDiet ? (
          <Spinner customClass="h-10 w-10 m-auto !stroke-green-500" />
        ) : (
          <>
            {diet ? (
              <div className="mb-auto flex h-full w-full flex-col gap-2">
                <ManualMeals
                  isEditing={isEditing}
                  diet={diet}
                  date={date}
                  setIsEditing={setIsEditing}
                  isMultipleDaysView={true}
                />
              </div>
            ) : (
              <div className="m-auto flex justify-center">
                <PlanGenerator
                  date={date}
                  dates={null}
                  setDoneGeneratingPlan={() => {}}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Plan;
