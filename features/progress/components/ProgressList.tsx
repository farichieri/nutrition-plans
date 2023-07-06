import {
  ProgressItem,
  selectProgressSlice,
  setProgressOpen,
} from "@/features/progress";
import { FC } from "react";
import { getWeight, getWeightText } from "@/utils/calculations";
import { PencilIcon } from "@heroicons/react/24/outline";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useDispatch, useSelector } from "react-redux";
import ProgressItemModal from "./ProgressItemModal";
import { sortProgress } from "../utils/sortProgress";

interface Props {}
const ProgressList: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  if (!user) return <></>;
  const { measurementUnit } = user;

  const { progress, progressOpen } = useSelector(selectProgressSlice);

  const handleOpen = (progress: ProgressItem) => {
    dispatch(setProgressOpen(progress));
  };

  return (
    <>
      {progressOpen && <ProgressItemModal progressItem={progressOpen} />}
      <div className="flex w-full max-w-5xl flex-col items-center justify-center divide-y rounded-md border border-y bg-white/50 p-5 shadow dark:bg-black/50">
        <div className="flex w-full justify-between rounded-sm px-2 py-2">
          <span>Date</span>
          <span>Weight</span>
          <span>Edit</span>
        </div>
        {sortProgress(Object.values(progress)).map((p) => {
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
