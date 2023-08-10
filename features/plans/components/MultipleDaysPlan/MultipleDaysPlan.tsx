import { FC, useState } from "react";
import { getDaysOfWeek } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import Plan from "../common/Plan";
import PlansGenerator from "./PlansGenerator";

interface Props {
  dateInterval: string;
}

const MultipleDaysPlan: FC<Props> = ({ dateInterval }) => {
  const { user } = useSelector(selectAuthSlice);
  const datesInterval = getDaysOfWeek(dateInterval);
  const isValidRange = datesInterval && datesInterval?.length <= 31;
  const [planBeingEdited, setPlanBeingEdited] = useState<string | null>(null);

  console.log(planBeingEdited);

  if (!user) return <></>;

  return (
    <div className="w-full">
      <PlansGenerator />
      <div className="flex w-full flex-col gap-20 sm:gap-10 ">
        {!datesInterval && "Invalid Dates Range"}
        {isValidRange ? (
          <>
            {datesInterval?.map((date) => {
              return (
                <div
                  key={date}
                  className={`overflow-hidden rounded-lg ${
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

export default MultipleDaysPlan;
