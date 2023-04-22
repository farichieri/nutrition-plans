import { FC } from "react";
import { format } from "date-fns";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  selectProgressSlice,
  setProgressOpen,
} from "@/store/slices/progressSlice";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ProgressItem } from "@/types/types";
import ProgressItemModal from "./ProgressItemModal";

interface Props {}
const ProgressList: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { progress, progressOpen } = useSelector(selectProgressSlice);
  const firstBodyData = user?.first_data.body_data;

  const createdData =
    user?.created_at && format(new Date(user?.created_at), "MM-yyyy");

  const handleOpen = (progress: ProgressItem) => {
    dispatch(setProgressOpen(progress));
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-1">
      {progressOpen && <ProgressItemModal progressItem={progressOpen} />}
      <div className="flex w-full justify-between rounded-sm border border-slate-300 px-2 py-1">
        <span>Date</span>
        <span>Weight</span>
        <span></span>
      </div>
      {Object.keys(progress).map((p) => (
        <div
          className="flex w-full justify-between gap-2 rounded-sm bg-gray-300/50 px-2 py-0.5"
          key={progress[p].date}
          onClick={() => handleOpen(progress[p])}
        >
          <span>{progress[p].date}</span>
          <span>{progress[p].weight}</span>
          <span>
            <PencilIcon
              className="h-4 w-4"
              onClick={() => handleOpen(progress[p])}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressList;
