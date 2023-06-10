import { FC, useEffect, useState } from "react";
import { fetchDietByDate } from "../../services";
import { selectPlansSlice, setDiet, setIsLoadingDiet } from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount, selectAuthSlice } from "@/features/authentication";
import MealCards from "../MealCards/MealCards";
import Nutrition from "../common/Nutrition";
import PlanGenerator from "../common/PlanGenerator";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  date: string;
}

const DayPlan: FC<Props> = ({ date }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [loading, setLoading] = useState(true);
  const { diets, isLoadingDiet, isCreatingDiet } =
    useSelector(selectPlansSlice);
  const diet = diets[date];
  const planID = diet?.plan_id;

  const getDayDiet = async (date: string, user: UserAccount) => {
    dispatch(setIsLoadingDiet(true));
    const res = await fetchDietByDate({ date, user });
    if (res.result === "success") {
      dispatch(setDiet(res.data));
    }
    dispatch(setIsLoadingDiet(false));
  };

  useEffect(() => {
    if (user) {
      getDayDiet(date, user);
    }
    setLoading(false);
  }, [date]);

  if (!user) return <></>;
  return (
    <div className="w-full">
      {isLoadingDiet || loading ? (
        <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
          <Spinner customClass="h-6 w-6 m-auto" />
        </div>
      ) : (
        <>
          {diet ? (
            <div className="mb-auto flex flex-col gap-2 ">
              <span className="text-xl font-semibold capitalize text-green-500">
                {planID?.replaceAll("_", " ")}
              </span>
              <div className="grid w-full gap-10 sm:grid-cols-fluid_lg">
                <div className="w-full rounded-md ">
                  <MealCards diet={diet} date={date} user={user} />
                </div>
                {diet && (
                  <div className=" w-full rounded-md  ">
                    <Nutrition
                      nutrients={diet.diet_nutrition}
                      planID={planID}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : isCreatingDiet ? (
            <div className="fixed inset-0 mt-auto flex h-screen w-screen flex-col items-center justify-center gap-2">
              <Spinner customClass="h-6 w-6" />
              <span>Generating Plan...</span>
            </div>
          ) : (
            <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
              <PlanGenerator date={date} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DayPlan;
