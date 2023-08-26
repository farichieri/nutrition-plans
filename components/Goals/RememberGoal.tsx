import { selectLayoutSlice } from "@/features/layout/slice";
import { FC } from "react";
import { getDaysLeft, getToday } from "@/utils";
import { getWeightAndText } from "@/utils/calculations";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import { useWindowWidth } from "@/hooks";
import Link from "next/link";

interface Props {}

const RememberGoal: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const { rememberGoalDate } = useSelector(selectLayoutSlice);
  const today = getToday();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  if (!user) return <></>;

  const { weightGoal, measurementUnit } = user;
  const { dueDate, weightGoalInKg } = weightGoal;
  const { weight, weightText } = getWeightAndText({
    weightInKg: weightGoalInKg!,
    to: measurementUnit,
  });
  const daysLeft = dueDate && getDaysLeft({ date: new Date(dueDate) });

  if (!daysLeft || rememberGoalDate === today) return <></>;

  if (isMobile) {
    return (
      <Link
        className="flex items-center gap-1 rounded-md border border-blue-500 bg-blue-400/30 px-2 py-1 text-xs xs:text-sm"
        href={"/app/progress"}
      >
        🎯
        <span className="font-semibold text-green-500">{daysLeft}</span>
        <span>days</span>
      </Link>
    );
  }

  return (
    <Link
      className="mx-auto flex items-center gap-1 rounded-md border border-blue-500 bg-blue-400/30 px-2 py-1"
      href={"/app/progress"}
    >
      🎯
      <span className="font-semibold text-green-500">{daysLeft}</span>
      <span>days</span>
      <span>to achieve my goal of</span>
      <span className="font-semibold text-green-500">
        {weight} {weightText}
      </span>
    </Link>
  );
};

export default RememberGoal;
