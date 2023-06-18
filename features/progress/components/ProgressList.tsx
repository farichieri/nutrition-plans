import {
  ProgressItem,
  selectProgressSlice,
  setProgressOpen,
} from "@/features/progress";
import { FC } from "react";
import { getWeight } from "@/utils/calculations";
import { PencilIcon } from "@heroicons/react/24/outline";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useDispatch, useSelector } from "react-redux";
import ProgressItemModal from "./ProgressItemModal";

interface Props {}
const ProgressList: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  if (!user) return <></>;
  const { measurement_unit } = user;

  const { progress, progressOpen } = useSelector(selectProgressSlice);

  const handleOpen = (progress: ProgressItem) => {
    dispatch(setProgressOpen(progress));
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-1 rounded-md border bg-white p-5 shadow dark:bg-black">
      {progressOpen && <ProgressItemModal progressItem={progressOpen} />}
      <div className="flex w-full justify-between rounded-sm border border-slate-300 px-2 py-1">
        <span>Date</span>
        <span>Weight</span>
        <span>Edit</span>
      </div>
      {Object.keys(progress).map((p) => {
        const progressWeight = progress[p].weight_in_kg;
        if (!progressWeight) return;
        const weight = getWeight({
          to: measurement_unit,
          weight: progressWeight,
        });
        return (
          <div
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border bg-gray-300/50 px-2 py-0.5"
            key={progress[p].date}
            onClick={() => handleOpen(progress[p])}
          >
            <span>{progress[p].date}</span>
            <span>{weight}</span>
            <span>
              <PencilIcon
                className="h-4 w-4"
                onClick={() => handleOpen(progress[p])}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressList;
