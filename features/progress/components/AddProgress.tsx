import ActionButton from "@/components/Buttons/ActionButton";
import WeightSelector from "@/components/WeightSelector/WeightSelector";
import { selectAuthSlice } from "@/features/authentication/slice";
import {
  selectProgressSlice,
  usePostProgressMutation,
} from "@/features/progress";
import { WeightUnitsT } from "@/types";
import { formatToInputDate, formatToUSDate } from "@/utils";
import { getWeightInKg } from "@/utils/calculations";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { formatISO, parse } from "date-fns";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface Props {}

const AddProgress: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const { progress } = useSelector(selectProgressSlice);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [input, setInput] = useState({
    date: "",
    weight: "",
  });
  const [weightSelected, setWeightSelected] = useState<WeightUnitsT>("kgs");

  useEffect(() => {
    if (input.date.length > 0 && input.weight.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [input]);

  const [postProgress, { isLoading: isAdding }] = usePostProgressMutation();

  if (!user) return <></>;

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
      createdAt: formatISO(new Date()),
      date: date,
      weightInKg: getWeightInKg({
        from: weightSelected,
        weight: Number(input.weight),
      }),
    };
    if (progress[date]) {
      toast.error("Progress already exists.\nTry updating it.");
      return;
    } else {
      const res = await postProgress({ progress: newProgress, user });
      if (!("error" in res)) {
        setInput({
          date: "",
          weight: "",
        });
        toast.success("Progress added successfully.");
      } else {
        toast.error("Error updating your Goal");
      }
    }
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

  const handleChangeUnit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const unit = event.currentTarget.value as WeightUnitsT;
    setWeightSelected(unit);
  };

  // today in input date format
  const today = formatToInputDate(new Date());

  return (
    <>
      {formOpened ? (
        <form
          className="relative m-auto flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border shadow-md bg-white p-6 dark:bg-black/50"
          onSubmit={handleSubmit}
        >
          <XCircleIcon
            onClick={handleClose}
            className="absolute right-2 top-2 h-5 w-5 cursor-pointer fill-gray-500"
          />
          <span className="font-semibold mb-2 text-xl">Add new progress</span>
          <div className="flex w-full gap-2">
            <label htmlFor="date" className="w-full basis-1/3">
              Date:
            </label>
            <input
              value={input.date}
              onChange={handleChange}
              name="date"
              type="date"
              max={today}
              required
              className="w-full basis-2/3 rounded-md border bg-transparent px-2 py-1"
            />
          </div>
          <div className="relative flex w-full items-center gap-2">
            <label htmlFor="weight" className="w-full basis-1/3">
              Weight
            </label>
            <input
              value={input.weight}
              onChange={handleChange}
              name="weight"
              type="number"
              placeholder="Weight"
              className="w-full basis-2/3 rounded-md border bg-transparent px-2 py-1"
            />
          </div>
          <WeightSelector
            onChange={handleChangeUnit}
            unitSelected={weightSelected}
          />
          <ActionButton
            loadMessage="Adding..."
            content="Add"
            isLoading={isAdding}
            isDisabled={isDisabled}
            type={"save"}
            className="w-40 py-1.5 mt-4"
            onClick={handleSubmit}
            action={undefined}
          />
        </form>
      ) : (
        <div id="tour-progress-2">
          <ActionButton
            loadMessage="Adding..."
            content="Add Progress"
            isLoading={false}
            isDisabled={false}
            type={"save"}
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
