import { FC, useState } from "react";
import { setUpdateUser } from "@/store/slices/authSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch } from "react-redux";
import { UserAccount } from "@/types/types";
import { UserSteps } from "@/types/types";
import Confetti from "../Confetti";
import SubmitButton from "../Buttons/SubmitButton";

interface Props {
  user: UserAccount;
}

const StepOne: FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const userUpdated: UserAccount = {
        ...user,
        user_step: UserSteps.step_2,
      };
      const updateUserRes = await updateUser(userUpdated);
      if (!updateUserRes?.error) {
        dispatch(setUpdateUser(userUpdated));
        setIsLoading(false);
        setIsDisabled(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/50">
      <Confetti />
      <div className="m-4 flex w-full max-w-xl flex-col items-center justify-center rounded-md border bg-white dark:bg-black">
        <div className="flex flex-col gap-3 p-5">
          <span className="text-center text-3xl">
            We are happy to welcome you to
          </span>
          <span className="text-center text-4xl font-semibold">
            Nutrition Plans! 🎉
          </span>
        </div>
        <div className="flex w-full items-center justify-center border-t p-5">
          <div className="m-auto flex">
            <SubmitButton
              className={"m-auto w-fit"}
              onClick={handleCreateUser}
              loadMessage={"Loading..."}
              content={`${"Continue"}`}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;