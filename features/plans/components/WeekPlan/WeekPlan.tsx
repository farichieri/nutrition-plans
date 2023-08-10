import { FC, useState } from "react";
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
  const [planBeingEdited, setPlanBeingEdited] = useState<string | null>(null);

  console.log(planBeingEdited);

  if (!user) return <></>;

  return (
    <div className="w-full">
      <div className="grid w-full gap-10 sm:grid-cols-fluid_md sm:gap-5 ">
        {!datesInterval && "Invalid Dates Range"}
        {isValidRange ? (
          <>
            {datesInterval?.map((date) => {
              return (
                <div
                  key={date}
                  className={`${
                    planBeingEdited === null
                      ? "bg-transparent blur-none"
                      : planBeingEdited === date
                      ? "bg-transparent "
                      : "pointer-events-none select-none blur-sm"
                  }`}
                >
                  <Plan date={date} setPlanBeingEdited={setPlanBeingEdited} />
                </div>
              );
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
