import {
  Diet,
  fetchDietByDate,
  MealCards,
  Nutrition,
  PlanGenerator,
} from "@/features/plans";
import { db } from "@/services/firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { selectPlansSlice, setDiet } from "@/features/plans/slice";
import { useDispatch, useSelector } from "react-redux";
import { User, selectAuthSlice } from "@/features/authentication";
import Spinner from "@/components/Loader/Spinner";
import DayNote from "../common/DayNote";

interface Props {
  date: string;
}

const DayPlan: FC<Props> = ({ date }) => {
  const dispatch = useDispatch();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [isLoadingDiet, setIsLoadingDiet] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const { diets } = useSelector(selectPlansSlice);
  const diet: Diet = diets[date];
  const planID = diet?.planID;

  const getDayDiet = async (date: string, user: User) => {
    console.log({ diet, date });
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
    setIsGeneratingPlan(false);
  }, [date]);

  if (!user) return <></>;

  // useEffect(() => {
  //   const docRef = doc(db, "users", user.id, "diets", date);
  //   console.log("snapshoting");
  //   onSnapshot(docRef, (doc) => {
  //     const data = (doc.data() as Diet) || { date };
  //     dispatch(setDiet(data));
  //   });
  // }, [onSnapshot]);

  return (
    <div className="w-full">
      {isGeneratingPlan || isLoadingDiet ? (
        <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
          <Spinner customClass="h-9 w-9 m-auto" />
        </div>
      ) : (
        <>
          {diet ? (
            <div className="mb-auto flex h-full flex-col gap-2">
              <div>
                <DayNote diet={diet} isEditing={isEditing} />
              </div>
              <div className="flex justify-between">
                <span className="text-xl font-semibold capitalize text-green-500">
                  {planID?.replaceAll("_", " ")}
                </span>
                <MdOutlineMoreHoriz className="h-6 w-6 opacity-50 hover:opacity-100" />
              </div>

              <div className="grid w-full gap-5 sm:grid-cols-fluid_lg sm:gap-5">
                <div className="flex w-full flex-col rounded-md">
                  <MealCards
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    diet={diet}
                    date={date}
                    user={user}
                  />
                </div>
                {diet && (
                  <div className=" w-full rounded-md  ">
                    <Nutrition nutrients={diet.nutrients} planID={planID} />
                  </div>
                )}
              </div>
            </div>
          ) : false ? (
            <div className="fixed inset-0 mt-auto flex h-screen w-screen flex-col items-center justify-center gap-2">
              <Spinner customClass="h-6 w-6" />
              <span>Generating Plan...</span>
            </div>
          ) : (
            <div className="fixed inset-0 mt-auto flex h-screen w-screen flex-col justify-center">
              <PlanGenerator
                date={date}
                setIsGeneratingPlan={setIsGeneratingPlan}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DayPlan;
