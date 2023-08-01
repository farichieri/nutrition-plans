import { convertDateToDateString, convertDayToUrlDate } from "../../utils";
import { Diet } from "../../types";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FC } from "react";
import AddPlanToFavorites from "./AddPlanToFavorites";
import PlanModal from "@/features/favorites/components/favorite_plans/plan_modal";

interface Props {
  diet: Diet;
}

const PlanCard: FC<Props> = ({ diet }) => {
  const { user } = useSelector(selectAuthSlice);
  const { date } = diet;

  if (!date || !user) return <></>;

  const calories = diet?.nutrients?.calories;
  const urlDate = convertDayToUrlDate(date!);
  const dateF = convertDateToDateString({
    date,
    userStartOfWeek: user?.startOfWeek,
  });

  return (
    <div
      className={`flex w-full flex-col items-center justify-start gap-2 rounded-lg border bg-slate-200/50 p-2 dark:bg-gray-500/10 lg:max-w-sm ${
        dateF === "today" ? "border-red-400/50" : ""
      }`}
    >
      <div className="flex w-full items-center border-b px-2 py-1">
        {diet && (
          <span className="mr-auto text-xl font-semibold capitalize text-green-500">
            {diet?.planID?.replaceAll("_", " ")}
          </span>
        )}
        {calories && (
          <span className="px-4 text-xs opacity-70">{calories} calories</span>
        )}
        <AddPlanToFavorites diet={diet} />
      </div>

      <div>
        <span>Diet Name: </span>
      </div>
      <PlanModal diet={diet} />
      {/* <Nutrition nutrients={diet.nutrients} planID={diet.planID} /> */}
    </div>
  );
};

export default PlanCard;
