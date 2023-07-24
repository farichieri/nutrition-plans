import { FC } from "react";
import { UserSteps, selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import StepOne from "./StepOne";

interface Props {}

const WelcomeSteps: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const step = user?.welcomeStep;

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
