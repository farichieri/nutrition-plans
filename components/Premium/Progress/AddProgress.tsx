import { addProgress } from "@/firebase/helpers/Progress";
import { FC, useState } from "react";
import { format, formatISO, parse } from "date-fns";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  selectProgressSlice,
  setAddProgress,
} from "@/store/slices/progressSlice";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "@/components/Buttons/ActionButton";
import { ButtonAction } from "@/types/types";

interface Props {}

const AddProgress: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const { progress } = useSelector(selectProgressSlice);
  const [isAdding, setIsAdding] = useState(false);
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
      date: date,
      weight: Number(input.weight),
      created_at: formatISO(new Date()),
    };
    if (progress[date]) {
      alert("Progress already exists");
      return;
    } else {
      setIsAdding(true);
      const res = await addProgress(user, newProgress);
      if (!res?.error) {
        dispatch(setAddProgress(newProgress));
      }
    }
    setIsAdding(false);
  };

  return (
    <form
      className="flex w-full max-w-4xl gap-2 rounded-xl bg-slate-300/50 p-4"
      onSubmit={handleSubmit}
    >
      <input
        value={input.date}
        onChange={handleChange}
        name="date"
        type="month"
        className="w-full rounded-md border bg-transparent px-2 py-0.5"
      />
      <input
        value={input.weight}
        onChange={handleChange}
        name="weight"
        type="text"
        placeholder="Weight"
        className="py-0. w-full rounded-md border bg-transparent px-2"
      />
      <ActionButton
        loadMessage="Adding..."
        content="Add"
        isLoading={isAdding}
        isDisabled={false}
        action={ButtonAction.save}
        className="w-40"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default AddProgress;
