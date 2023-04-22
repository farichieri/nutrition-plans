import { FC } from "react";
import { format, formatISO, parse } from "date-fns";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

interface Props {}
const ProgressList: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const firstBodyData = user?.first_data.body_data;
  const dispatch = useDispatch();
  const progress = user?.progress;
  const progressSorted =
    progress &&
    [...progress]?.sort((a, b) => {
      const first = formatISO(parse(String(a.date), "MM-yyyy", new Date()));
      const second = formatISO(parse(String(b.date), "MM-yyyy", new Date()));
      return first.localeCompare(second);
    });
  const createdData =
    user?.created_at && format(new Date(user?.created_at), "MM-yyyy");

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-1">
      <div className="flex w-full justify-between gap-2 rounded-sm bg-gray-300/80 px-2 py-0.5">
        <span>{createdData}</span>
        <span>{firstBodyData?.weight_in_kg}</span>
      </div>
      {progressSorted?.map((p) => (
        <div
          className="flex w-full justify-between gap-2 rounded-sm bg-gray-300/50 px-2 py-0.5"
          key={p.date}
        >
          <span>{p.date}</span>
          <span>{p.weight}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressList;
