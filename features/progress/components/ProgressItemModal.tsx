import {
  ProgressItem,
  deleteProgress,
  updateProgress,
  setDeleteProgress,
  setProgressOpen,
  setUpdateProgress,
  newProgressItem,
} from "@/features/progress";
import { FC, useEffect, useState } from "react";
import { formatTwoDecimals } from "@/utils";
import { getWeight, getWeightInKg, getWeightUnit } from "@/utils/calculations";
import { selectAuthSlice } from "@/features/authentication/slice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "@/components/Buttons/ActionButton";
import Modal from "@/components/Modal/Modal";

interface Props {
  progressItem: ProgressItem;
}

const ProgressItemModal: FC<Props> = ({ progressItem }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  const measurementUnit = user?.measurementUnit;
  const [progressState, setProgressState] =
    useState<ProgressItem>(newProgressItem);

  useEffect(() => {
    let weightFormatted = 0;
    if (measurementUnit) {
      weightFormatted = getWeight({
        to: measurementUnit,
        weight: Number(progressItem.weightInKg),
      });
    }
    let progressItemF = {
      ...progressItem,
      weightInKg: weightFormatted,
    };
    setProgressState(progressItemF);
  }, [measurementUnit, setProgressState]);

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
    setIsSaving(true);
    const progressUpdated = {
      ...progressItem,
      weightInKg: getWeightInKg({
        from: measurementUnit,
        weight: Number(progressState.weightInKg),
      }),
    };
    const res = await updateProgress(user, progressUpdated);
    if (res.result === "success") {
      dispatch(setUpdateProgress(progressUpdated));
      dispatch(setProgressOpen(null));
      toast.success("Progress updated successfully");
    } else {
      toast.error("Error updating Progress");
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteProgress(user, progressItem);
    if (res.result === "success") {
      dispatch(setDeleteProgress(progressItem.date));
      dispatch(setProgressOpen(null));
      toast.success("Progress deleted successfully");
    } else {
      toast.error("Error deleting Progress");
    }
    setIsDeleting(false);
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
            {getWeightUnit({ from: measurementUnit })}
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
            isDisabled={isDisabled}
            type={"delete"}
            className="w-full"
            onClick={handleDelete}
            action="submit"
          />
          <ActionButton
            loadMessage="Saving..."
            content="Save"
            isLoading={isSaving}
            isDisabled={isDisabled}
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
