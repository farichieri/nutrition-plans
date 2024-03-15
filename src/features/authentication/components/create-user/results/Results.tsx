"use client";

import { formatISO } from "date-fns";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import SubmitButton from "@/components/Buttons/SubmitButton";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import InfoTooltip from "@/components/Tooltip/InfoTooltip";
import {
  selectAuthSlice,
  setIsCreatingUser,
  useUpdateUserMutation,
} from "@/features/authentication";
import {
  BMISignificance,
  calculateKCALSRecommended,
} from "@/features/authentication/utils/calculateBodyData";
import {
  usePostDefaultMealsSettingsMutation,
  usePostDefaultUserMealsMutation,
} from "@/features/meals";
import {
  getWelcomeNotification,
  useCreateNotificationMutation,
} from "@/features/notifications";
import { ProgressItem, usePostProgressMutation } from "@/features/progress";
import { formatToUSDate } from "@/utils";

import NutritionTarget from "../NutritionTarget";

interface Props {
  handleSubmit: Function;
}

const Results: FC<Props> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const isCreatingRoute = pathname === "/app/create";
  const [updateUser] = useUpdateUserMutation();

  const { bodyData, goal, planSelected, nutritionTargets } = user!;
  const { weightInKg, activity, BMR, BMI } = bodyData;

  const [postProgress] = usePostProgressMutation();

  const addFirstProgress = async () => {
    const newProgress: ProgressItem = {
      createdAt: formatISO(new Date()),
      date: formatToUSDate(new Date()),
      weightInKg: weightInKg,
    };
    try {
      if (!user) throw Error;
      const res = await postProgress({ user, progress: newProgress });
      if ("error" in res) {
        return { result: "error" };
      }
      return {
        result: "success",
        data: res.data,
      };
    } catch (error) {
      console.error(error);
      return { result: "error" };
    }
  };

  const [createNotification] = useCreateNotificationMutation();
  const [postDefaultMealsSettings] = usePostDefaultMealsSettingsMutation();
  const [postDefaultUserMeals] = usePostDefaultUserMealsMutation();

  const handleCreateUser = async (event: React.FormEvent) => {
    if (!user) return;
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
        completedAt: formatISO(new Date()),
        bodyData: bodyDataUpdated,
        isProfileCompleted: true,
        nutritionTargets: nutritionTargets,
        firstData: {
          bodyData: bodyDataUpdated,
        },
      };
      const notification = getWelcomeNotification();
      const [addProgressRes, mealSettings, addMeals, welcomeNotification] =
        await Promise.all([
          addFirstProgress(),
          postDefaultMealsSettings({ user }),
          postDefaultUserMeals({ user }),
          createNotification({ user, notification: notification }),
        ]);

      if (
        addProgressRes.result !== "error" &&
        !("error" in mealSettings) &&
        !("error" in addMeals) &&
        "error" in welcomeNotification === false
      ) {
        dispatch(setIsCreatingUser(false));

        const res = await updateUser({ user, fields });
        if (!("error" in res)) {
          handleSubmit();
        } else {
          throw Error;
        }
      } else {
        throw Error;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something happened!");
    } finally {
      if (!isCreatingRoute) {
        setIsLoading(false);
        setIsDisabled(false);
      }
    }
  };

  if (!user) return <></>;

  const caloriesRecommended = calculateKCALSRecommended({
    BMR: BMR!,
    goal: goal!,
    activity: activity!,
  });

  return (
    <Box id="tour-profile_nutrition_values-0">
      <BoxMainContent>
        <div className="flex flex-col gap-10">
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
            <span
              id="tour-profile_nutrition_values-1"
              className="text-green-500"
            >
              {caloriesRecommended}
            </span>
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
                  <span className="text-green-500">{Math.round(BMR!)} </span>
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
            <NutritionTarget planSelected={planSelected!} />
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
