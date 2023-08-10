import {
  calculateKCALSRecommended,
  BMISignificance,
} from "@/features/authentication/utils/calculateBodyData";
import {
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
import { addProgress, ProgressItem, setAddProgress } from "@/features/progress";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { FC, useState } from "react";
import { formatISO } from "date-fns";
import { formatToUSDate } from "@/utils";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import InfoTooltip from "@/components/Tooltip/InfoTooltip";
import NutritionTarget from "../NutritionTarget";
import SubmitButton from "@/components/Buttons/SubmitButton";

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

  const { bodyData, goal, planSelected, nutritionTargets } = user;
  const { weightInKg, heightInCm, age, gender, activity, BMR, BMI } = bodyData;
  if (
    !weightInKg ||
    !heightInCm ||
    !age ||
    !gender ||
    !activity ||
    !goal ||
    !planSelected ||
    !BMR ||
    !BMI
  )
    return <>There's missing data to calculate Nutrition Targets</>;

  const caloriesRecommended = calculateKCALSRecommended({
    BMR: BMR,
    goal: goal,
    activity: activity,
  });

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
    try {
      setIsLoading(true);
      setIsDisabled(true);
      if (!nutritionTargets) return;
      const bodyDataUpdated = {
        ...user.bodyData,
        BMI: BMI,
        BMR: BMR,
      };
      const fields = {
        bodyData: bodyDataUpdated,
        isProfileCompleted: true,
        nutritionTargets: nutritionTargets,
        firstData: {
          bodyData: bodyDataUpdated,
        },
      };
      const [addProgressRes, mealSettings, addMeals] = await Promise.all([
        addFirstProgress(),
        createDefaultMealsSettings(user),
        createDefaultUserMeals(user),
      ]);

      if (
        addProgressRes.result === "success" &&
        mealSettings.result === "success" &&
        addMeals.result === "success"
      ) {
        dispatch(setUserMealsSettings(mealSettings.data));
        dispatch(setUserMeals(addMeals.data));
        dispatch(setUpdateUser({ user, fields }));
        dispatch(setIsCreatingUser(false));

        const updateUserRes = await updateUser({ user, fields });
        if (updateUserRes.result === "success") {
          handleSubmit();
        } else {
          throw Error;
        }
      } else {
        throw Error;
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something happened!");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <Box>
      <BoxMainContent>
        <div className="flex flex-col gap-10 p-5">
          <div className="flex items-center gap-2">
            <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />
            <span className="w-full text-left text-xl font-semibold sm:text-3xl">
              {isCreatingRoute ? "Nutrition Targets" : "Nutrition Targets"}
            </span>
          </div>
          <div>
            <span>
              In order to accomplish your goal of{" "}
              <span className="capitalize text-green-500">
                {user.goal?.replace("_", " ")}
              </span>{" "}
              we have calculated the next daily calories for your nutrition
              plan:{" "}
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
            <NutritionTarget planSelected={planSelected} />
          </div>
        </div>
      </BoxMainContent>
      <BoxBottomBar>
        {isCreatingRoute ? (
          <>
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
          </>
        ) : (
          <>
            {/* <span className="text-sm opacity-50"></span>
            <SubmitButton
              className={"h-9 w-fit text-sm"}
              onClick={() => {}}
              loadMessage={""}
              content="Customize"
              isLoading={isLoading}
              isDisabled={false}
            /> */}
          </>
        )}
      </BoxBottomBar>
    </Box>
  );
};

export default Results;
