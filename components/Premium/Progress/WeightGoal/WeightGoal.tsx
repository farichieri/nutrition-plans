import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  setAddWeightGoalOpen,
  selectProgressSlice,
} from "@/store/slices/progressSlice";
import { FC, useState } from "react";
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

  console.log({ addWeightGoalOpen });
  console.log({ goal });

  return (
    <div>
      {addWeightGoalOpen && <WeightGoalModal weightGoal={goal} />}
      {!goal ? (
        <div>
          <button
            className="rounded-md bg-green-500 px-2 py-1 text-white shadow-md"
            onClick={handleOpen}
          >
            Add Weight Goal
          </button>
        </div>
      ) : (
        <div>{goal.weight_goal_in_kg}</div>
      )}
    </div>
  );
};
export default WeightGoal;
