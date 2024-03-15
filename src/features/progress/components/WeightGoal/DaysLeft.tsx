import { UserGoalsT, selectAuthSlice } from "@/features/authentication";
import { WeightUnitsT } from "@/types";
import { getDaysLeft } from "@/utils";
import { getWeightAndText } from "@/utils/calculations";
import { FC } from "react";
import { useSelector } from "react-redux";

interface Props {
  unitSelected: WeightUnitsT;
}

const DaysLeft: FC<Props> = ({ unitSelected }) => {
  const { user } = useSelector(selectAuthSlice);

  if (!user) return <></>;

  const { weightGoal, goal } = user;
  const { dueDate, weightGoalInKg } = weightGoal;
  const { weight, weightText } = getWeightAndText({
    weightInKg: weightGoalInKg!,
    to: unitSelected,
  });
  const daysLeft = getDaysLeft({ date: new Date(dueDate!) });

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
    <div
      id="tour-progress-4"
      className="flex flex-col rounded-md border border-blue-500 bg-blue-400/30 px-10 py-4"
    >
      <div className="flex items-center gap-1">
        <span>Your Goal:</span>
        <span className="font-semibold capitalize text-green-500">
          {goal?.replaceAll("_", " ")}
        </span>
        <span>{getEmoji({ goal: goal! })}</span>
      </div>

      <div className="flex items-center gap-1">
        <span>Weight Goal 🎯:</span>
        {weight > 0 && (
          <span className="font-semibold text-green-500">
            {weight} {weightText}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <span>Days left:</span>
        {daysLeft > 0 && (
          <span className="font-semibold text-blue-500">{daysLeft}</span>
        )}
      </div>
    </div>
  );
};

export default DaysLeft;
