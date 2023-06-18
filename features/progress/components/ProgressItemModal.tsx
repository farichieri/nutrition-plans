import {
  ProgressItem,
  deleteProgress,
  updateProgress,
  setDeleteProgress,
  setProgressOpen,
  setUpdateProgress,
  newProgressItem,
} from "@/features/progress";
import { ButtonType } from "@/types";
import { FC, useEffect, useState } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "@/components/Buttons/ActionButton";
import Modal from "@/components/Modal/Modal";
import { getWeight, getWeightUnit } from "@/utils/calculations";

interface Props {
  progressItem: ProgressItem;
}

const ProgressItemModal: FC<Props> = ({ progressItem }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  const measurement_unit = user?.measurement_unit;
  const [progressState, setProgressState] =
    useState<ProgressItem>(newProgressItem);

  useEffect(() => {
    let weightFormatted;

    if (measurement_unit) {
      weightFormatted = getWeight({
        to: measurement_unit,
        weight: Number(progressItem.weight_in_kg),
      });
    }

    let progressItemF = {
      created_at: progressItem.created_at,
      date: progressItem.date,
      weight_in_kg: weightFormatted || 0,
    };

    setProgressState(progressItemF);
  }, []);

  if (!user || !measurement_unit) return <></>;

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
      weight_in_kg: progressState.weight_in_kg,
    };
    const res = await updateProgress(user, progressUpdated);
    if (res.result === "success") {
      dispatch(setUpdateProgress(progressUpdated));
      dispatch(setProgressOpen(null));
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteProgress(user, progressItem);
    if (res.result === "success") {
      dispatch(setDeleteProgress(progressItem.date));
      dispatch(setProgressOpen(null));
    }
    setIsDeleting(false);
  };

  return (
    <Modal onClose={handleClose}>
      <div className="flex flex-col gap-3 p-10">
        <span className="text-center text-xl font-semibold">Edit Progress</span>
        <div className="flex w-full items-center gap-1">
          <span className="basis-1/3">Date:</span>
          <span className="basis-2/3">{progressItem.date}</span>
        </div>
        <div className="relative flex w-full items-center gap-1">
          <span className="basis-1/3">Weight:</span>
          <span className="absolute right-2 select-none">
            {getWeightUnit({ from: measurement_unit })}
          </span>
          <input
            className="flex w-full basis-2/3 rounded-md border bg-transparent px-1.5 py-2"
            type="number"
            name="weight_in_kg"
            placeholder="Weight"
            value={String(progressItem.weight_in_kg)}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-2 pt-5">
          <ActionButton
            loadMessage="Deleting..."
            content="Delete"
            isLoading={isDeleting}
            isDisabled={isDisabled}
            type={ButtonType.delete}
            className="w-full"
            onClick={handleDelete}
            action="submit"
          />
          <ActionButton
            loadMessage="Saving..."
            content="Save"
            isLoading={isSaving}
            isDisabled={isDisabled}
            type={ButtonType.save}
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
