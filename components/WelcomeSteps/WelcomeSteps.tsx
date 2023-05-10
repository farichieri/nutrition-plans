import { FC } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { UserSteps } from "@/types/types";
import { useSelector } from "react-redux";
import StepOne from "./StepOne";

interface Props {}

const WelcomeSteps: FC<Props> = ({}) => {
  const { user } = useSelector(selectAuthSlice);
  const step = user?.user_step;

  const getStep = () => {
    if (!user) return;
    switch (step) {
      case UserSteps.step_1:
        return <StepOne user={user} />;

      default:
        break;
    }
  };

  return <>{getStep()}</>;
};

export default WelcomeSteps;
