import ActionButton from "@/components/Buttons/ActionButton";
import Modal from "@/components/Modal/Modal";
import { selectAuthSlice } from "@/features/authentication/slice";
import {
  ProgressItem,
  newProgressItem,
  setProgressOpen,
  useDeleteProgressMutation,
  useUpdateProgressMutation,
} from "@/features/progress";
import { formatTwoDecimals } from "@/utils";
import { getWeight, getWeightInKg, getWeightUnit } from "@/utils/calculations";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  progressItem: ProgressItem;
}

const ProgressItemModal: FC<Props> = ({ progressItem }) => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const [updateProgress, { isLoading: isSaving }] = useUpdateProgressMutation();
  const [deleteProgress, { isLoading: isDeleting }] =
    useDeleteProgressMutation();

  const measurementUnit = user?.measurementUnit;
  const unitSelected = measurementUnit === "imperial" ? "lbs" : "kgs";

  const [progressState, setProgressState] =
    useState<ProgressItem>(newProgressItem);

  useEffect(() => {
    let weightFormatted = 0;
    weightFormatted = getWeight({
      to: unitSelected,
      weight: Number(progressItem.weightInKg),
    });
    let progressItemF = {
      ...progressItem,
      weightInKg: weightFormatted,
    };
    setProgressState(progressItemF);
  }, [unitSelected, setProgressState, progressItem]);

  if (!user || !measurementUnit) return <></>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const valueF = name === "weight" ? Number(value) : value;
    setProgressState({
      ...progressState,
      [name]: valueF,
    });
  };

  const handleClose = () => {
    dispatch(setProgressOpen(null));
  };

  const handleSave = async () => {
    const progressUpdated = {
      ...progressItem,
      weightInKg: getWeightInKg({
        from: unitSelected,
        weight: Number(progressState.weightInKg),
      }),
    };
    const res = await updateProgress({ user, progress: progressUpdated });
    if (!("error" in res)) {
      dispatch(setProgressOpen(null));
      toast.success("Progress updated successfully");
    } else {
      toast.error("Error updating Progress");
    }
  };

  const handleDelete = async () => {
    const res = await deleteProgress({ user, progress: progressItem });
    if (!("error" in res)) {
      dispatch(setProgressOpen(null));
      toast.success("Progress deleted successfully");
    } else {
      toast.error("Error deleting Progress");
    }
  };

  return (
    <Modal onClose={handleClose}>
      <div className="flex flex-col gap-3 p-10">
        <span className="text-center text-xl font-semibold">Edit Progress</span>
        <div className="flex w-full items-center gap-1">
          <span className="basis-1/3">Date:</span>
          <span className="basis-2/3">{progressState.date}</span>
        </div>
        <div className="relative flex w-full items-center gap-1">
          <span className="basis-1/3">Weight:</span>
          <span className="absolute right-2 select-none">
            {getWeightUnit({ from: unitSelected })}
          </span>
          <input
            className="flex w-full basis-2/3 rounded-md border bg-transparent px-1.5 py-2"
            type="number"
            name="weightInKg"
            placeholder="Weight"
            value={String(formatTwoDecimals(progressState.weightInKg))}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-2 pt-5">
          <ActionButton
            loadMessage="Deleting..."
            content="Delete"
            isLoading={isDeleting}
            isDisabled={isDeleting}
            type={"delete"}
            className="w-full"
            onClick={handleDelete}
            action="submit"
          />
          <ActionButton
            loadMessage="Saving..."
            content="Save"
            isLoading={isSaving}
            isDisabled={isSaving}
            type={"save"}
            className="w-full"
            onClick={handleSave}
            action="submit"
          />
        </div>
      </div>
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
    </Modal>
  );
};

export default ProgressItemModal;
