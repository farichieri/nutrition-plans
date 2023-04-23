import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  setAddWeightGoalOpen,
  selectProgressSlice,
} from "@/store/slices/progressSlice";
import { FC } from "react";
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
    <div>
      {addWeightGoalOpen && <WeightGoalModal weightGoal={goal} />}
      {!goal?.weight_goal_in_kg ? (
        <div>
          <button
            className="rounded-md bg-green-500 px-2 py-1 text-white shadow-md"
            onClick={handleOpen}
          >
            Add Weight Goal
          </button>
        </div>
      ) : (
        <button
          className="rounded-xl border p-5 shadow-md"
          onClick={handleOpen}
        >
          <span className="text-2xl font-semibold">Weight Goal</span>
          <div className="flex gap-1">
            <span>Due date:</span>
            <span>{goal.due_date}</span>
          </div>
          <div className="flex gap-1">
            <span>Weight goal:</span>
            <span>{goal.weight_goal_in_kg}</span>
          </div>
        </button>
      )}
    </div>
  );
};
export default WeightGoal;
