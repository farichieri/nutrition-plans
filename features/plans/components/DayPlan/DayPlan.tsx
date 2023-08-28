import {
  Diet,
  DietNutrition,
  MealCards,
  PlanGenerator,
} from "@/features/plans";
import { FC, useEffect, useState } from "react";
import { fetchDietByDate } from "@/features/plans/services";
import { selectPlansSlice, setDiet } from "@/features/plans/slice";
import { useDispatch, useSelector } from "react-redux";
import { User, selectAuthSlice } from "@/features/authentication";
import DayNote from "../common/DayNote";
import Spinner from "@/components/Loader/Spinner";

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
    console.log({ res });
    if (res.result === "success") {
      dispatch(setDiet(res.data));
    } else {
      dispatch(setDiet({ date: date, id: undefined }));
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
    <div className="relative m-auto h-full w-full rounded-lg">
      {isGeneratingPlan ||
        (isLoadingDiet && (
          <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
            <Spinner customClass="h-10 w-10 m-auto !stroke-green-500" />
          </div>
        ))}
      <>
        {diet ? (
          <div className="mb-auto flex h-full flex-col gap-2">
            <div className="flex items-center">
              <span className="text-xl font-semibold capitalize text-green-500">
                {planID?.replaceAll("_", " ")}
              </span>
            </div>

            <div>
              <DayNote diet={diet} isEditing={isEditing} />
            </div>
            <div className="relative flex w-full flex-col gap-14 sm:grid sm:grid-cols-fluid_lg sm:gap-5">
              <div
                id="tour-dayPlan-0"
                className="flex w-full flex-col rounded-md"
              >
                <MealCards
                  isEditing={isEditing}
                  diet={diet}
                  date={date}
                  setIsEditing={setIsEditing}
                  isMultipleDaysView={false}
                />
              </div>
              {diet && (
                <div>
                  <div className="sticky top-24" id="tour-dayPlan-3">
                    <DietNutrition
                      nutrients={diet.nutrients}
                      planID={planID}
                      diet={diet}
                      isEditing={isEditing}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 mt-auto flex h-screen w-screen flex-col justify-center">
            <PlanGenerator
              date={date}
              dates={null}
              setDoneGeneratingPlan={() => {}}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default DayPlan;
