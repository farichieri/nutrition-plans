import Collapsable from "@/components/Layout/Collapsable";
import { selectAuthSlice } from "@/features/authentication";
import { selectProgressSlice, setAddWeightGoalOpen } from "@/features/progress";
import { getWeight, getWeightText } from "@/utils/calculations";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeightGoalModal from "./WeightGoalModal";

interface Props {}

const WeightGoal: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { addWeightGoalOpen } = useSelector(selectProgressSlice);

  if (!user) return <></>;

  const { weightGoal, measurementUnit } = user;

  const handleOpen = () => {
    dispatch(setAddWeightGoalOpen(true));
  };

  const realWeightGoal = getWeight({
    to: measurementUnit === "metric" ? "kgs" : "lbs",
    weight: weightGoal.weightGoalInKg || 0,
  });

  return (
    <div className="mr-auto flex w-full max-w-sm items-center justify-center">
      {addWeightGoalOpen && <WeightGoalModal weightGoal={weightGoal} />}
      <Collapsable
        showed={"Weight Goal"}
        hidden={
          <section className="flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-md border bg-white dark:bg-black">
            <div className="flex w-full flex-col gap-3 p-5">
              <span className="w-full text-left text-3xl font-semibold">
                Weight Goal
              </span>
              {weightGoal.weightGoalInKg && (
                <div>
                  <div className="flex gap-1">
                    <span>Due date:</span>
                    <span className="text-green-500">{weightGoal.dueDate}</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Weight goal:</span>
                    <span className="text-green-500">
                      {getWeightText({
                        from: measurementUnit,
                        weight: realWeightGoal,
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
                {weightGoal.weightGoalInKg
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
