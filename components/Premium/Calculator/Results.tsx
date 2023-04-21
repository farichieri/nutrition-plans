import { FC, useState } from "react";
import { FOOD_PREFERENCES } from "@/utils/formContents";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount } from "@/types/types";
import { useRouter } from "next/router";
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

  console.log({ user });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setIsLoading(true);
    const userUpdated: UserAccount = {
      ...user,
      is_profile_completed: true,
    };
    const res = await updateUser(userUpdated);
    if (!res?.error) {
      dispatch(setUpdateUser(userUpdated));
      handleSubmit();
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
    <section className="flex w-full flex-col items-center justify-center">
      {/* <span className="text-3xl font-bold">Nutrition preferences</span> */}
      <form action="" className="flex w-full max-w-[30rem] flex-col gap-10">
        <div className="flex flex-col gap-4 font-medium">
          <div>
            <span>
              In order to accomplish your goal of{" "}
              <span className="text-green-500">{user?.goal}</span> we have
              calculated the next daily calories for your nutrition plan:{" "}
            </span>
            <span className="text-green-500">{user?.kcals_recommended}</span>
          </div>
          <div>
            <span>Your BMR (Basal Metabolic Rate) is: </span>
            <span className="text-green-500">{user?.BMR}</span>
          </div>
          <div className="flex flex-col">
            <div>
              <span>Your BMI (Body Mass Index) is: </span>
              <span className="text-green-500">{user?.BMI}</span>
            </div>
            <div>
              <span>A BMI of {user?.BMI} is stipulated to be: </span>
              <span className="text-green-500">
                {BMISignificance(Number(user?.BMI))}
              </span>
            </div>
          </div>
        </div>
        <SubmitButton
          className={"m-auto w-fit"}
          onClick={onSubmit}
          loadMessage={"Loading..."}
          content={`${isCreatingRoute ? "Start my plan" : "Save"}`}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
      </form>
    </section>
  );
};

export default Results;
