import {
  Diet,
  fetchDietByDate,
  MealCards,
  Nutrition,
  PlanGenerator,
} from "@/features/plans";
import { FC, useEffect, useState } from "react";
import { selectPlansSlice, setDiet } from "@/features/plans/slice";
import { useDispatch, useSelector } from "react-redux";
import { User, selectAuthSlice } from "@/features/authentication";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  date: string;
}

const DayPlan: FC<Props> = ({ date }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const { diets } = useSelector(selectPlansSlice);
  const diet: Diet = diets[date];
  const planID = diet?.planID;
  const [isLoadingDiet, setIsLoadingDiet] = useState<boolean>(false);

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
    <div className="w-full">
      {isGeneratingPlan || isLoadingDiet ? (
        <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
          <Spinner customClass="h-6 w-6 m-auto" />
        </div>
      ) : (
        <>
          {diet ? (
            <div className="mb-auto flex h-full flex-col gap-2">
              <span className="text-xl font-semibold capitalize text-green-500">
                {planID?.replaceAll("_", " ")}
              </span>
              <div className="grid w-full gap-5 sm:grid-cols-fluid_lg sm:gap-5">
                <div className="flex w-full flex-col rounded-md">
                  <MealCards diet={diet} date={date} user={user} />
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
