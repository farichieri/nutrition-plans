import { FC, useState } from "react";
import { format, formatISO, parse } from "date-fns";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const AddProgress: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const progress = user?.progress;

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
    if (progress?.find((p) => p.date === date)) {
      alert("Progress already exists");
      return;
    } else {
      const userUpdated = {
        ...user,
        progress: [...user.progress, newProgress],
      };
      const res = await updateUser(userUpdated);
      if (!res?.error) {
        dispatch(setUpdateUser(userUpdated));
      }
    }
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
      <button className=" w-40 rounded-3xl bg-green-500 py-1 ">Add</button>
    </form>
  );
};

export default AddProgress;
