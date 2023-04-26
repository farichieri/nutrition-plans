import { addProgress } from "@/firebase/helpers/Progress";
import { FC, useEffect, useState } from "react";
import { format, formatISO, parse } from "date-fns";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  selectProgressSlice,
  setAddProgress,
} from "@/store/slices/progressSlice";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "@/components/Buttons/ActionButton";
import { ButtonAction } from "@/types/types";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface Props {}

const AddProgress: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const { progress } = useSelector(selectProgressSlice);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    date: "",
    weight: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.date || !input.weight || !user) return;
    const dateParsed = parse(input.date, "yyyy-MM", new Date());
    const date = format(dateParsed, "MM-yyyy");
    const newProgress = {
      created_at: formatISO(new Date()),
      date: date,
      weight: Number(input.weight),
    };
    if (progress[date]) {
      alert("Progress already exists");
      return;
    } else {
      setIsAdding(true);
      const res = await addProgress(user, newProgress);
      if (!res?.error) {
        dispatch(setAddProgress(newProgress));
        setInput({
          date: "",
          weight: "",
        });
      }
    }
    setIsAdding(false);
  };

  const handleOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setFormOpened(true);
  };

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setFormOpened(false);
    setInput({
      date: "",
      weight: "",
    });
  };

  useEffect(() => {
    if (input.date.length > 0 && input.weight.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [input]);

  return (
    <>
      {formOpened ? (
        <form
          className="relative m-auto flex w-full max-w-xs flex-col items-center gap-2 rounded-xl bg-slate-300/50 p-6"
          onSubmit={handleSubmit}
        >
          <XCircleIcon
            onClick={handleClose}
            className="absolute right-2 top-2 h-5 w-5 cursor-pointer fill-gray-500"
          />
          <div className="flex w-full gap-2">
            <label htmlFor="date" className="w-full basis-1/3">
              Date:
            </label>
            <input
              value={input.date}
              onChange={handleChange}
              name="date"
              type="month"
              className="w-full basis-2/3 rounded-md border bg-transparent px-2 py-0.5"
            />
          </div>
          <div className="flex w-full gap-2">
            <label htmlFor="weight" className="w-full basis-1/3">
              Weight
            </label>
            <input
              value={input.weight}
              onChange={handleChange}
              name="weight"
              type="number"
              placeholder="Weight"
              className="w-full basis-2/3 rounded-md border bg-transparent px-2 py-0.5"
            />
          </div>
          <ActionButton
            loadMessage="Adding..."
            content="Add"
            isLoading={isAdding}
            isDisabled={isDisabled}
            action={ButtonAction.save}
            className="w-40"
            onClick={handleSubmit}
          />
        </form>
      ) : (
        <div>
          <ActionButton
            loadMessage="Adding..."
            content="Add Progress"
            isLoading={false}
            isDisabled={false}
            action={ButtonAction.save}
            className="w-40"
            onClick={handleOpen}
          />
        </div>
      )}
    </>
  );
};

export default AddProgress;
