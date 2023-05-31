import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { setAddWeightGoalOpen, selectProgressSlice } from "@/features/progress";
import { useDispatch, useSelector } from "react-redux";
import WeightGoalModal from "./WeightGoalModal";

interface Props {}

const WeightGoal: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const { addWeightGoalOpen } = useSelector(selectProgressSlice);
  const dispatch = useDispatch();
  const goal = user?.weight_goal;

  const handleOpen = () => {
    dispatch(setAddWeightGoalOpen(true));
  };

  return (
    <section className="flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-md border bg-white dark:bg-black">
      {addWeightGoalOpen && <WeightGoalModal weightGoal={goal} />}
      <div className="flex w-full flex-col gap-3 p-5">
        <span className="w-full p-5 text-left text-3xl font-semibold">
          Weight Goal
        </span>
        {goal?.weight_goal_in_kg && (
          <div>
            <div className="flex gap-1">
              <span>Due date:</span>
              <span className="text-green-500">{goal.due_date}</span>
            </div>
            <div className="flex gap-1">
              <span>Weight goal:</span>
              <span className="text-green-500">{goal.weight_goal_in_kg}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center border-t p-5">
        <button
          className="rounded-md bg-green-500 px-2 py-1 text-white shadow-md"
          onClick={handleOpen}
        >
          {goal?.weight_goal_in_kg ? "Edit Weight Goal" : "Add Weight Goal"}
        </button>
      </div>
    </section>
  );
};
export default WeightGoal;
