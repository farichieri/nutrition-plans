import {
  UserAccount,
  selectAuthSlice,
  setIsCreatingUser,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import {
  createDefaultMealsSettings,
  createDefaultUserMeals,
  setUserMeals,
  setUserMealsSettings,
} from "@/features/meals";
import {
  BMISignificance,
  calculateBMI,
  calculateBMR,
  calculateKCALSRecommended,
} from "../../../utils/calculateBodyData";
import { addProgress, ProgressItem, setAddProgress } from "@/features/progress";
import { FC, useState } from "react";
import { formatISO } from "date-fns";
import { getNutritionTargets } from "../../../utils/getNutritionTargets";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import NutritionTarget from "../NutritionTarget";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { formatToUSDate } from "@/utils";
import InfoTooltip from "@/components/Tooltip/InfoTooltip";
import { BiSolidPieChartAlt2 } from "react-icons/bi";

interface Props {
  handleSubmit: Function;
}

const Results: FC<Props> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const isCreatingRoute = router.asPath === "/app/create";

  if (!user) return <>No user found</>;

  const { bodyData, goal, planSelected } = user;
  const { weightInKg, heightInCm, age, gender, activity } = bodyData;
  if (
    !weightInKg ||
    !heightInCm ||
    !age ||
    !gender ||
    !activity ||
    !goal ||
    !planSelected
  )
    return <>There's missing data to calculate Nutrition Values</>;

  const BMI = calculateBMI({ kgs: weightInKg, cms: heightInCm });
  const BMR = calculateBMR({
    kgs: weightInKg,
    cms: heightInCm,
    age: age,
    gender: gender,
  });
  const caloriesRecommended = calculateKCALSRecommended({
    BMR: BMR,
    goal: goal,
    activity: activity,
  });

  console.log({ user });

  const nutritionTargets = getNutritionTargets(
    caloriesRecommended,
    planSelected
  );

  const addFirstProgress = async () => {
    const newProgress: ProgressItem = {
      createdAt: formatISO(new Date()),
      date: formatToUSDate(new Date()),
      weightInKg: weightInKg,
    };
    const res = await addProgress(user, newProgress);
    if (res.result === "success") {
      dispatch(setAddProgress(newProgress));
    }
    return res;
  };

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    try {
      if (!nutritionTargets) return;
      const bodyDataUpdated = {
        ...user.bodyData,
        BMI: BMI,
        BMR: BMR,
        caloriesRecommended: caloriesRecommended,
      };
      const fields = {
        bodyData: bodyDataUpdated,
        isProfileCompleted: true,
        nutritionTargets: nutritionTargets,
        firstData: {
          bodyData: bodyDataUpdated,
        },
      };
      const [updateUserRes, addProgressRes, mealSettings, addMeals] =
        await Promise.all([
          updateUser({ user, fields }),
          addFirstProgress(),
          createDefaultMealsSettings(user),
          createDefaultUserMeals(user),
        ]);

      if (
        updateUserRes.result === "success" &&
        addProgressRes.result === "success" &&
        mealSettings.result === "success" &&
        addMeals.result === "success"
      ) {
        dispatch(setUserMealsSettings(mealSettings.data));
        dispatch(setUserMeals(addMeals.data));
        dispatch(setUpdateUser({ user, fields }));
        dispatch(setIsCreatingUser(false));
        handleSubmit();
      }
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
    setIsDisabled(false);
  };

  return (
    <section className="flex w-full max-w-5xl select-none flex-col items-center justify-center gap-3 rounded-md border bg-white/50 text-xs dark:bg-black/50 s:text-sm sm:text-base">
      <form action="" className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-10 p-5">
          <div className="flex items-center gap-2">
            <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
            <span className="w-full text-left text-xl font-semibold sm:text-3xl">
              {isCreatingRoute ? "Nutrition Values" : "Nutrition Values"}
            </span>
          </div>
          <div>
            <span>
              In order to accomplish your goal of{" "}
              <span className="text-green-500">{user.goal}</span> we have
              calculated the next daily calories for your nutrition plan:{" "}
            </span>
            <span className="text-green-500">{caloriesRecommended}</span>
          </div>
          <div className="flex flex-col gap-4 font-medium">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <InfoTooltip
                  id="BMR"
                  message="The basal metabolic rate (BMR) is the amount of energy
                    needed while resting in a temperate environment when the
                    digestive system is inactive."
                />
                <div>
                  <span>Your BMR (Basal Metabolic Rate) is: </span>
                  <span className="text-green-500">{Math.round(BMR)} </span>
                  <span>calories</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <InfoTooltip
                  id="BMI"
                  message="The body mass index (BMI) is a measure that uses your height and weight to work out if your weight is healthy."
                />
                <div>
                  <span>Your BMI (Body Mass Index) is: </span>
                  <span className="text-green-500">{BMI}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <InfoTooltip
                  id="BMI-2"
                  message="BMI doesn’t differentiate between lean body mass (the weight of everything in your body except fat) and fat mass. Because of this, a person can have a high BMI (by being muscular) but still have a very low fat mass and vice versa."
                />
                <div>
                  <span>A BMI of {BMI} is stipulated to be: </span>
                  <span className="text-green-500">
                    {BMISignificance(Number(BMI))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <NutritionTarget
              calories={caloriesRecommended}
              planSelected={planSelected}
            />
          </div>
        </div>
        {isCreatingRoute && (
          <div className="flex items-center justify-center border-t p-5">
            <div className="ml-auto flex">
              <SubmitButton
                className={"w-26 m-auto flex h-9 min-w-fit items-center"}
                onClick={handleCreateUser}
                loadMessage={"Loading..."}
                content={`${isCreatingRoute ? "Start 💪" : "Save"}`}
                isLoading={isLoading}
                isDisabled={isDisabled}
              />
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default Results;
