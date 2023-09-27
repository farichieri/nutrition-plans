import {
  User,
  UserSteps,
  useUpdateUserMutation,
} from "@/features/authentication";
import { FC } from "react";
import { toast } from "react-hot-toast";
import Confetti from "../confetti/Confetti";
import SubmitButton from "../Buttons/SubmitButton";
import { useDispatch } from "react-redux";
import { setIsSubscribeModalOpen } from "@/features/layout/slice";

interface Props {
  user: User;
}

const StepOne: FC<Props> = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    try {
      const fields = { welcomeStep: UserSteps.step_2 };
      const res = await updateUser({ user, fields });
      if ("error" in res) {
        throw new Error("Error updating user");
      }
      dispatch(setIsSubscribeModalOpen(true));
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
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
          <span className="text-center text-sm opacity-70">
            You have <b className="text-green-500">7 days of free trial</b>.
            This is a new platform, however, we are building and improving it
            every day, we hope you like it!
          </span>
        </div>
        <div className="flex w-full items-center justify-center border-t p-5">
          <div className="m-auto flex">
            <SubmitButton
              className={"m-auto h-9 w-24"}
              onClick={handleClick}
              loadMessage={"Loading..."}
              content={`${"Continue"}`}
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
