import {
  UserAccount,
  UserSteps,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
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
      const fields = {welcomeStep: UserSteps.Two}
      const updateUserRes = await updateUser({user, fields});
      if (updateUserRes.result === "success") {
        dispatch(setUpdateUser({user, fields}));
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
          <span className="text-center text-3xl">Welcome to</span>
          <span className="text-center text-4xl font-semibold">
            Nutrition Plans, {user.displayName}! 🎉
          </span>
        </div>
        <div className="flex w-full items-center justify-center border-t p-5">
          <div className="m-auto flex">
            <SubmitButton
              className={"m-auto h-9 w-24"}
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
