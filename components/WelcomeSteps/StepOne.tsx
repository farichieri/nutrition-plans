import {
  User,
  UserSteps,
  useUpdateUserMutation,
} from "@/features/authentication";
import { FC } from "react";
import { toast } from "react-hot-toast";
import Confetti from "../confetti/Confetti";
import SubmitButton from "../Buttons/SubmitButton";

interface Props {
  user: User;
}

const StepOne: FC<Props> = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    try {
      const fields = { welcomeStep: UserSteps.step_2 };
      const res = await updateUser({ user, fields });
      if ("error" in res) {
        throw new Error("Error updating user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log({ error });
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
              isDisabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
