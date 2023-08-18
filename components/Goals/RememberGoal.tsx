import {
  selectLayoutSlice,
  setRememberGoalDate,
} from "@/features/layout/slice";
import { FC, useState } from "react";
import { getDaysLeft, getToday } from "@/utils";
import { getWeightAndText } from "@/utils/calculations";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useWindowWidth } from "@/hooks";

interface Props {}

const RememberGoal: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const { rememberGoalDate } = useSelector(selectLayoutSlice);
  const dispatch = useDispatch();
  const today = getToday();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  const [showFullContent, setShowFullContent] = useState(false);

  if (!user) return <></>;

  const { weightGoal, measurementUnit } = user;
  const { dueDate, weightGoalInKg } = weightGoal;
  const { weight, weightText } = getWeightAndText({
    weightInKg: weightGoalInKg!,
    to: measurementUnit,
  });
  const daysLeft = dueDate && getDaysLeft({ date: new Date(dueDate) });

  const handleClick = () => {
    dispatch(setRememberGoalDate(today));
  };

  if (!daysLeft || rememberGoalDate === today) return <></>;

  if (isMobile) {
    return (
      <div className="ml-2 flex items-center gap-1 rounded-md border border-blue-500 bg-blue-400/30 px-1 py-1 text-xs">
        🎯
        <span className="font-semibold text-green-500">{daysLeft}</span>
        <span>days</span>
      </div>
    );
  }

  return (
    <div className="mx-auto flex items-center gap-1 rounded-md border border-blue-500 bg-blue-400/30 px-2 py-1">
      🎯
      <span className="font-semibold text-green-500">{daysLeft}</span>
      <span>days</span>
      <span>to achieve my goal of</span>
      <span className="font-semibold text-green-500">
        {weight} {weightText}
      </span>
      {/* <button
        className="ml-2 rounded-md border border-green-500 bg-green-300 px-2 dark:bg-green-600"
        onClick={handleClick}
      >
        I will make it!
      </button> */}
    </div>
  );
};

export default RememberGoal;
