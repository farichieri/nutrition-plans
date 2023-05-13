import { FC, useState } from "react";
import { newBodyData, newNutritionTargets } from "@/types/initialTypes";
import {
  selectAuthSlice,
  setIsCreatingUser,
  setUpdateUser,
} from "@/store/slices/authSlice";
import { addProgress } from "@/firebase/helpers/Progress";
import { format, formatISO } from "date-fns";
import { NutritionTargets, ProgressItem, UserAccount } from "@/types/types";
import { setAddProgress } from "@/store/slices/progressSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import NutritionTarget from "./NutritionTarget";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface Props {
  handleSubmit: Function;
}

const Results: FC<Props> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const body_data = user?.body_data || newBodyData;
  const [nutritionTargets, setNutritionTargets] =
    useState<NutritionTargets>(newNutritionTargets);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const isCreatingRoute = router.asPath === "/app/create";

  const addFirstProgress = async () => {
    if (!user) return;
    const newProgress: ProgressItem = {
      created_at: formatISO(new Date()),
      date: format(new Date(), "MM-yyyy"),
      weight: user.body_data.weight_in_kg,
    };
    const res = await addProgress(user, newProgress);
    if (!res?.error) {
      dispatch(setAddProgress(newProgress));
    }
    return res;
  };

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const userUpdated: UserAccount = {
        ...user,
        first_data: {
          body_data: user.body_data,
          food_data: user.food_data,
        },
        is_profile_completed: true,
        nutrition_targets: nutritionTargets,
      };
      const updateUserRes = await updateUser(userUpdated);
      const addProgressRes = await addFirstProgress();
      if (!updateUserRes?.error && !addProgressRes?.error) {
        dispatch(setUpdateUser(userUpdated));
        handleSubmit();
        dispatch(setIsCreatingUser(false));
        setIsLoading(false);
        setIsDisabled(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const BMISignificance = (BMI: number) => {
    if (BMI < 18.5) {
      return "Underweight";
    } else if (BMI >= 18.5 && BMI <= 24.9) {
      return "Normal";
    } else if (BMI >= 25 && BMI <= 29.9) {
      return "Overweight";
    } else if (BMI >= 30) {
      return "Obesity";
    }
  };

  return (
    <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-5 rounded-md border bg-white dark:bg-black">
      <form action="" className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center">
            <span className="material-icons text-green-500">data_usage</span>
            <span className="w-full p-5 text-left text-3xl font-semibold">
              {isCreatingRoute ? "Nutrition Values" : "Nutrition Values"}
            </span>
          </div>

          <div className="flex flex-col gap-4 font-medium">
            <div>
              <span>
                In order to accomplish your goal of{" "}
                <span className="text-green-500">{body_data.goal}</span> we have
                calculated the next daily calories for your nutrition plan:{" "}
              </span>
              <span className="text-green-500">
                {body_data.kcals_recommended}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="material-icons text-blue-400">info</span>
                <div>
                  <span>Your BMR (Basal Metabolic Rate) is: </span>
                  <span className="text-green-500">{body_data.BMR} </span>
                  <span>calories</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-icons text-blue-400">info</span>
                <div>
                  <span>Your BMI (Body Mass Index) is: </span>
                  <span className="text-green-500">{body_data.BMI}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-icons text-blue-400">info</span>
                <div>
                  <span>A BMI of {body_data.BMI} is stipulated to be: </span>
                  <span className="text-green-500">
                    {BMISignificance(Number(body_data.BMI))}
                  </span>
                </div>
                {/* <span>BMI (body mass index), which is based on the height and weight of a person, is an inaccurate measure of body fat content and does not take into account muscle mass, bone density, overall body composition, and racial and sex differences,</span> */}
              </div>
            </div>
          </div>
          <div className="py-5">
            <NutritionTarget setNutritionTargets={setNutritionTargets} />
          </div>
        </div>
        {isCreatingRoute && (
          <div className="flex items-center justify-center border-t p-5">
            <div className="ml-auto flex">
              <SubmitButton
                className={"m-auto h-9 w-20"}
                onClick={handleCreateUser}
                loadMessage={"Loading..."}
                content={`${isCreatingRoute ? "Start" : "Save"}`}
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
