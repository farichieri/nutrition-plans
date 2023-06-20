import {
  UserAccount,
  newBodyData,
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
import { format, formatISO } from "date-fns";
import { getNutritionTargets } from "../../../utils/getNutritionTargets";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import NutritionTarget from "../NutritionTarget";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { formatToUSDate } from "@/utils";

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

  const { body_data, goal, plan_selected } = user;
  const { weight_in_kg, height_in_cm, age, gender, activity } = body_data;
  if (
    !weight_in_kg ||
    !height_in_cm ||
    !age ||
    !gender ||
    !activity ||
    !goal ||
    !plan_selected
  )
    return <>There's missing data to calculate Nutrition Values</>;

  const BMI = calculateBMI({ kgs: weight_in_kg, cms: height_in_cm });
  const BMR = calculateBMR({
    kgs: weight_in_kg,
    cms: height_in_cm,
    age: age,
    gender: gender,
  });
  const kcals_recommended = calculateKCALSRecommended({
    BMR: BMR,
    goal: goal,
    activity: activity,
  });

  console.log({ user });

  const nutritionTargets = getNutritionTargets(
    kcals_recommended,
    plan_selected
  );

  const addFirstProgress = async () => {
    const newProgress: ProgressItem = {
      created_at: formatISO(new Date()),
      date: formatToUSDate(new Date()),
      weight_in_kg: weight_in_kg,
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
        ...user.body_data,
        BMI: BMI,
        BMR: BMR,
        kcals_recommended: kcals_recommended,
      };
      const userUpdated: UserAccount = {
        ...user,
        body_data: bodyDataUpdated,
        is_profile_completed: true,
        nutrition_targets: nutritionTargets,
        first_data: {
          body_data: bodyDataUpdated,
        },
      };
      const [updateUserRes, addProgressRes, mealSettings, addMeals] =
        await Promise.all([
          updateUser(userUpdated),
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
        dispatch(setUpdateUser(userUpdated));
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
            <span className="material-icons text-green-500">data_usage</span>
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
            <span className="text-green-500">{kcals_recommended}</span>
          </div>
          <div className="flex flex-col gap-4 font-medium">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div>
                  <span>Your BMR (Basal Metabolic Rate) is: </span>
                  <span className="text-green-500">{Math.round(BMR)} </span>
                  <span>calories</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div>
                  <span>Your BMI (Body Mass Index) is: </span>
                  <span className="text-green-500">{BMI}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div>
                  <span>A BMI of {BMI} is stipulated to be: </span>
                  <span className="text-green-500">
                    {BMISignificance(Number(BMI))}
                  </span>
                </div>
                {/* <span>BMI (body mass index), which is based on the height and weight of a person, is an inaccurate measure of body fat content and does not take into account muscle mass, bone density, overall body composition, and racial and sex differences,</span> */}
              </div>
            </div>
          </div>
          <div className="">
            <NutritionTarget
              calories={kcals_recommended}
              plan_selected={plan_selected}
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
