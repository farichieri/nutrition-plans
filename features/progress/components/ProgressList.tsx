import {
  getUserWithNewWeight,
  useUpdateUserMutation,
} from "@/features/authentication";
import {
  ProgressItem,
  selectProgressSlice,
  setProgressOpen,
} from "@/features/progress";
import { FC, useEffect } from "react";
import { getWeight, getWeightText } from "@/utils/calculations";
import { PencilIcon } from "@heroicons/react/24/outline";
import { selectAuthSlice } from "@/features/authentication/slice";
import { sortProgress } from "../utils/sortProgress";
import { useDispatch, useSelector } from "react-redux";
import ProgressItemModal from "./ProgressItemModal";

interface Props {}
const ProgressList: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [updateUser] = useUpdateUserMutation();

  if (!user) return <></>;

  const { measurementUnit } = user;

  const { progress, progressOpen } = useSelector(selectProgressSlice);

  const handleOpen = (progress: ProgressItem) => {
    dispatch(setProgressOpen(progress));
  };

  const progressSorted = sortProgress(Object.values(progress));
  const lastProgress = progressSorted[progressSorted.length - 1];

  const updateUserWeight = async () => {
    if (lastProgress.weightInKg !== user.bodyData.weightInKg) {
      try {
        if (!lastProgress.weightInKg) throw new Error("Missing data");

        const newUserRes = getUserWithNewWeight({
          user,
          newWeightInKgs: lastProgress.weightInKg,
        });

        if (newUserRes.result === "error") {
          throw new Error("Error updating user weight");
        }
        const newUser = newUserRes.data;

        const fields = {
          bodyData: newUser.bodyData,
          nutritionTargets: newUser.nutritionTargets,
        };
        const res = await updateUser({
          user,
          fields,
        });
        if ("error" in res) {
          throw new Error("Error updating user weight");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    updateUserWeight();
  }, [lastProgress]);

  return (
    <>
      {progressOpen && <ProgressItemModal progressItem={progressOpen} />}
      <div
        id="tour-progress-1"
        className="flex w-full max-w-5xl flex-col items-center justify-center divide-y rounded-md border border-y bg-white/50 p-5 shadow dark:bg-black/50"
      >
        <div className="flex w-full justify-between rounded-sm px-2 py-2">
          <span>Date</span>
          <span>Weight</span>
          <span>Edit</span>
        </div>
        {progressSorted.map((p) => {
          const progressWeight = p.weightInKg;
          if (!progressWeight) return;
          const weight = getWeight({
            to: measurementUnit,
            weight: progressWeight,
          });
          return (
            <div
              className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm bg-transparent px-2 py-2 hover:bg-slate-500/20"
              key={p.date}
              onClick={() => handleOpen(p)}
            >
              <span>{p.date}</span>
              <span>
                {getWeightText({ from: measurementUnit, weight: weight })}
              </span>
              <span>
                <PencilIcon className="h-4 w-4" onClick={() => handleOpen(p)} />
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProgressList;
