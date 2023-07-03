import { FC } from "react";
import { getDaysOfWeek } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { selectPlansSlice } from "@/features/plans";
import { useSelector } from "react-redux";
import Plan from "../common/Plan";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  dateInterval: string;
}

const WeekPlan: FC<Props> = ({ dateInterval }) => {
  const { user } = useSelector(selectAuthSlice);
  const { isLoadingDiet } = useSelector(selectPlansSlice);
  const week = getDaysOfWeek(dateInterval);

  if (!user || !user.startOfWeek) return <></>;

  return (
    <div className="w-full">
      {isLoadingDiet ? (
        <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
          <Spinner customClass="h-6 w-6 m-auto" />
        </div>
      ) : (
        <div className="grid w-full gap-10 sm:grid-cols-fluid_md sm:gap-5 ">
          {!week && "Invalid Week"}
          {week?.map((date) => {
            return <Plan date={date} key={date} />;
          })}
        </div>
      )}
    </div>
  );
};

export default WeekPlan;
