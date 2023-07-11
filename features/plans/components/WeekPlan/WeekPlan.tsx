import { FC } from "react";
import { getDaysOfWeek } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import Plan from "../common/Plan";

interface Props {
  dateInterval: string;
}

const WeekPlan: FC<Props> = ({ dateInterval }) => {
  const { user } = useSelector(selectAuthSlice);
  const datesInterval = getDaysOfWeek(dateInterval);
  const isValidRange = datesInterval && datesInterval?.length <= 31;

  if (!user) return <></>;

  return (
    <div className="w-full">
      <div className="grid w-full gap-10 sm:grid-cols-fluid_md sm:gap-5 ">
        {!datesInterval && "Invalid Dates Range"}
        {isValidRange ? (
          <>
            {datesInterval?.map((date) => {
              return <Plan date={date} key={date} />;
            })}
          </>
        ) : (
          <div className="fixed inset-0 mt-auto flex h-screen w-screen items-center justify-center">
            <span>Invalid Dates Range</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekPlan;
