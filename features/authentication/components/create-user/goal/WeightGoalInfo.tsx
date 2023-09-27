import { FC } from "react";
import { formatTwoDecimals, getDaysLeft } from "@/utils";
import { getWeight, getWeightText } from "@/utils/calculations";
import { MeasurementUnitsT } from "@/types";
import { UserGoalsT } from "@/features/authentication/types";

interface Props {
  currentWeight: number;
  dueDate: string | null;
  measurementUnit: MeasurementUnitsT;
  weightGoalInKg: number | null;
}

const WeightGoalInfo: FC<Props> = ({
  dueDate,
  weightGoalInKg,
  currentWeight,
  measurementUnit,
}) => {
  const formDueDate = dueDate;
  const formWeightGoal = weightGoalInKg;

  const weightGoalDiff = Number(formWeightGoal) - currentWeight;
  const daysLeft = formDueDate && getDaysLeft({ date: new Date(formDueDate) });
  const weeksLeft = (daysLeft && Math.ceil(daysLeft / 7)) || 1;
  const weightDiffPerWeek = Math.abs(
    Number(formatTwoDecimals(weightGoalDiff / weeksLeft))
  );
  const maxWeightDiffRecommended = formatTwoDecimals(currentWeight * 1) / 100;
  const maxWeightDiffRecommendedText = getWeightText({
    weight: maxWeightDiffRecommended,
    from: measurementUnit,
  });
  const weightDiffPerWeekText = getWeightText({
    weight: weightDiffPerWeek,
    from: measurementUnit,
  });

  const getWeightGoalText = () => {
    if (weightGoalDiff > 0) {
      return "winning";
    } else if (weightGoalDiff < 0) {
      return "losing";
    } else {
      return "";
    }
  };

  if (!daysLeft || weightDiffPerWeek === 0) return <></>;

  if (weightDiffPerWeek > maxWeightDiffRecommended) {
    return (
      <div className="flex flex-col gap-1 rounded-md border border-red-500 bg-red-500/20 p-2 text-sm">
        <span>
          We don't recommend weight changes greater than <b>1%</b> of your
          current weight per week.
        </span>
        <span>
          Max weight change recommended per week:{" "}
          <b>{maxWeightDiffRecommendedText}</b>.
        </span>
        <span>
          Weight change per week: selected <b>{weightDiffPerWeekText}</b>.
        </span>
        <span>You can choose a greater date to remove this warning.</span>
      </div>
    );
  } else if (weightDiffPerWeek < maxWeightDiffRecommended) {
    return (
      <div className="flex flex-col gap-1 rounded-md border border-green-500 bg-green-500/20 p-2 text-sm">
        <span>
          You will be {getWeightGoalText()} <b>{weightDiffPerWeekText}</b> per
          week and you have <b>{daysLeft} days</b> to achieve your goal!
        </span>
        <span>You can do it ! 💪</span>
      </div>
    );
  } else {
    return <></>;
  }
};

export default WeightGoalInfo;
