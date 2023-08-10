import { UserGoalsT, selectAuthSlice } from "@/features/authentication";
import { getWeight, getWeightUnit } from "@/utils/calculations";
import { FC } from "react";
import { useSelector } from "react-redux";

interface Props {}

const DaysLeft: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);

  if (!user) return <></>;

  const { weightGoal, measurementUnit, goal } = user;
  const { dueDate, weightGoalInKg } = weightGoal;
  const realWeight = getWeight({
    to: measurementUnit,
    weight: weightGoalInKg!,
  });
  const realWeightUnit = getWeightUnit({ from: measurementUnit });

  const getDaysLeft = () => {
    const today = new Date();
    const due = new Date(dueDate!);
    const daysLeft = Math.floor(
      (due.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return daysLeft + 1;
  };

  const getEmoji = ({ goal }: { goal: UserGoalsT }) => {
    switch (goal) {
      case "lose_weight":
        return "🥗";
      case "build_muscle":
        return "💪";
      case "maintain":
        return "🧘";
      default:
        return "🧘";
    }
  };

  return (
    <div className="flex flex-col rounded-md border border-blue-500 bg-blue-400/30 px-10 py-4">
      <div className="flex items-center gap-1">
        <span>Your Goal:</span>
        <span className="font-semibold capitalize text-green-500">
          {goal?.replaceAll("_", " ")}
        </span>
        <span>{getEmoji({ goal: goal! })}</span>
      </div>
      <div className="flex items-center gap-1">
        <span>Weight Goal:</span>
        <span className="font-semibold text-green-500">
          {realWeight} {realWeightUnit}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span>Days left:</span>
        <span className="font-semibold text-blue-500">{getDaysLeft()}</span>
      </div>
    </div>
  );
};

export default DaysLeft;
