import { FC } from "react";
import { getWeight, getWeightText } from "@/utils/calculations";
import { MeasurementUnits } from "@/types";
import { selectAuthSlice } from "@/features/authentication";
import { setAddWeightGoalOpen, selectProgressSlice } from "@/features/progress";
import { useDispatch, useSelector } from "react-redux";
import WeightGoalModal from "./WeightGoalModal";
import Collapsable from "@/components/Layout/Collapsable";

interface Props {}

const WeightGoal: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { addWeightGoalOpen } = useSelector(selectProgressSlice);

  if (!user) return <></>;

  const { weight_goal, measurement_unit } = user;

  const handleOpen = () => {
    dispatch(setAddWeightGoalOpen(true));
  };

  const weightGoal = getWeight({
    to: measurement_unit,
    weight: weight_goal.weight_goal_in_kg || 0,
  });

  return (
    <div className="mr-auto flex w-full max-w-sm items-center justify-center">
      {addWeightGoalOpen && <WeightGoalModal weightGoal={weight_goal} />}
      <Collapsable
        showed={"Weight Goal"}
        hidden={
          <section className="flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-md border bg-white dark:bg-black">
            <div className="flex w-full flex-col gap-3 p-5">
              <span className="w-full text-left text-3xl font-semibold">
                Weight Goal
              </span>
              {weight_goal.weight_goal_in_kg && (
                <div>
                  <div className="flex gap-1">
                    <span>Due date:</span>
                    <span className="text-green-500">
                      {weight_goal.due_date}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span>Weight goal:</span>
                    <span className="text-green-500">
                      {getWeightText({
                        from: measurement_unit,
                        weight: weightGoal,
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-full items-center justify-center border-t p-5">
              <button
                className="rounded-md bg-green-500 px-2 py-1 text-white shadow-md"
                onClick={handleOpen}
              >
                {weight_goal.weight_goal_in_kg
                  ? "Edit Weight Goal"
                  : "Add Weight Goal"}
              </button>
            </div>
          </section>
        }
        defaultState={false}
      />
    </div>
  );
};
export default WeightGoal;
