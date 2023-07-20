import { convertDateToDateString, convertDayToUrlDate } from "../../utils";
import { db } from "@/services/firebase/firebase.config";
import { Diet } from "../../types";
import { doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { fetchDietByDate } from "../../services";
import { ManualMeals } from "..";
import { selectPlansSlice, setDiet } from "@/features/plans/slice";
import { useDispatch, useSelector } from "react-redux";
import { User, selectAuthSlice } from "@/features/authentication";
import Link from "next/link";
import PlanGenerator from "./PlanGenerator";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  date: string;
}

const Plan: FC<Props> = ({ date }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { diets } = useSelector(selectPlansSlice);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isLoadingDiet, setIsLoadingDiet] = useState(false);
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

  if (!user) return <></>;

  const calories = diet?.nutrients?.calories;
  const urlDate = convertDayToUrlDate(date);
  const dateF = convertDateToDateString({
    date,
    userStartOfWeek: user?.startOfWeek,
  });

  // useEffect(() => {
  //   const docRef = doc(db, "users", user.id, "diets", date);
  //   onSnapshot(docRef, (doc) => {
  //     console.log("snapshot, Plan");
  //     const data = (doc.data() as Diet) || { date };
  //     dispatch(setDiet(data));
  //   });
  // }, [onSnapshot]);

  return (
    <div
      className={`flex w-full flex-col items-center justify-start gap-2 rounded-lg border bg-slate-200/50 p-2 dark:bg-gray-500/10 ${
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
            {dateF}
          </span>
        </Link>
        {calories && (
          <span className="text-xs opacity-70">{calories} calories</span>
        )}
        <span className="text-xl font-semibold capitalize text-green-500">
          {diet?.planID?.replaceAll("_", " ")}
        </span>
      </div>
      <div className="flex h-full min-h-[15rem] w-full flex-col">
        {isGeneratingPlan || isLoadingDiet ? (
          <Spinner customClass="h-6 w-6 m-auto" />
        ) : (
          <>
            {diet ? (
              <div className="mb-auto flex h-full w-full flex-col gap-2">
                <ManualMeals diet={diet} date={date} user={user} />
              </div>
            ) : (
              <div className="m-auto flex justify-center">
                <PlanGenerator
                  date={date}
                  setIsGeneratingPlan={setIsGeneratingPlan}
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
