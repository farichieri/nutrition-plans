import {
  selectProgressSlice,
  setAddProgress,
  addProgress,
} from "@/features/progress";
import { ButtonType } from "@/types";
import { FC, useEffect, useState } from "react";
import { formatISO, parse } from "date-fns";
import { formatToUSDate } from "@/utils";
import { getWeightInKg, getWeightUnit } from "@/utils/calculations";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useDispatch, useSelector } from "react-redux";
import { XCircleIcon } from "@heroicons/react/24/solid";
import ActionButton from "@/components/Buttons/ActionButton";
import { toast } from "react-hot-toast";

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

  useEffect(() => {
    if (input.date.length > 0 && input.weight.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [input]);

  if (!user) return <></>;

  const { measurement_unit } = user;

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
    const dateParsed = parse(input.date, "yyyy-MM-dd", new Date());
    const date = formatToUSDate(dateParsed);
    const newProgress = {
      created_at: formatISO(new Date()),
      date: date,
      weight_in_kg: getWeightInKg({
        from: measurement_unit,
        weight: Number(input.weight),
      }),
    };
    if (progress[date]) {
      toast.error("Progress already exists.\nTry updating it.");
      return;
    } else {
      setIsAdding(true);
      const res = await addProgress(user, newProgress);
      if (res.result === "success") {
        dispatch(setAddProgress(newProgress));
        setInput({
          date: "",
          weight: "",
        });
        toast.success("Progress added successfully.");
      } else {
        toast.error("Error updating your Goal");
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

  console.log({ user });
  return (
    <>
      {formOpened ? (
        <form
          className="relative m-auto flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border border-green-500 bg-black/10 p-6 dark:bg-black/50"
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
              type="date"
              className="w-full basis-2/3 rounded-md border bg-transparent px-2 py-1"
            />
          </div>
          <div className="relative flex w-full items-center gap-2">
            <label htmlFor="weight" className="w-full basis-1/3">
              Weight
            </label>
            <span className="absolute right-2 select-none">
              {getWeightUnit({ from: measurement_unit })}
            </span>
            <input
              value={input.weight}
              onChange={handleChange}
              name="weight"
              type="number"
              placeholder="Weight"
              className="w-full basis-2/3 rounded-md border bg-transparent px-2 py-1"
            />
          </div>
          <ActionButton
            loadMessage="Adding..."
            content="Add"
            isLoading={isAdding}
            isDisabled={isDisabled}
            type={ButtonType.save}
            className="w-40 py-1.5"
            onClick={handleSubmit}
            action={undefined}
          />
        </form>
      ) : (
        <div>
          <ActionButton
            loadMessage="Adding..."
            content="Add Progress"
            isLoading={false}
            isDisabled={false}
            type={ButtonType.save}
            className="w-40 py-1.5"
            onClick={handleOpen}
            action={undefined}
          />
        </div>
      )}
      <style jsx>
        {`
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"] {
            -webkit-appearance: none;
            margin: 0;
            -moz-appearance: textfield !important;
          }
        `}
      </style>
    </>
  );
};

export default AddProgress;
