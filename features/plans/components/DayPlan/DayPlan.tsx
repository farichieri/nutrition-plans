import {
  Diet,
  MealCards,
  Nutrition,
  PlanGenerator,
  SaveAndEditButton,
} from "@/features/plans";
import { fetchDietByDate } from "@/features/plans/services";
import { FC, useEffect, useState } from "react";
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

  return (
    <div className="relative h-full w-full rounded-lg p-2">
      {isGeneratingPlan || isLoadingDiet ? (
        <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
          <Spinner customClass="h-9 w-9 m-auto" />
        </div>
      ) : (
        <>
          {diet ? (
            <div className="mb-auto flex h-full flex-col gap-2">
              <div className="flex items-center">
                <span className="text-xl font-semibold capitalize text-green-500">
                  {planID?.replaceAll("_", " ")}
                </span>
                <div className=" ml-auto">
                  <SaveAndEditButton
                    diet={diet}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    date={date}
                    user={user}
                  />
                </div>
              </div>

              <div>
                <DayNote diet={diet} isEditing={isEditing} />
              </div>
              <div className="relative grid w-full gap-14 sm:grid-cols-fluid_lg sm:gap-5">
                <div className="flex w-full flex-col rounded-md">
                  <MealCards isEditing={isEditing} diet={diet} />
                </div>
                {diet && (
                  <div className="z-[50]">
                    <div className="sticky top-24 ">
                      <Nutrition nutrients={diet.nutrients} planID={planID} />
                    </div>
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
