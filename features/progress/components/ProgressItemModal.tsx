import {
  ProgressItem,
  deleteProgress,
  updateProgress,
  setDeleteProgress,
  setProgressOpen,
  setUpdateProgress,
} from "@/features/progress";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { ButtonType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal/Modal";
import ActionButton from "@/components/Buttons/ActionButton";

interface Props {
  progressItem: ProgressItem;
}

const ProgressItemModal: FC<Props> = ({ progressItem }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  const [progressState, setProgressState] = useState<ProgressItem>({
    created_at: progressItem.created_at,
    date: progressItem.date,
    weight: progressItem.weight,
  });

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
    if (!user) return;
    setIsSaving(true);
    const progressUpdated = {
      ...progressItem,
      weight: progressState.weight,
    };
    const res = await updateProgress(user, progressUpdated);
    if (res.result === "success") {
      dispatch(setUpdateProgress(progressUpdated));
      dispatch(setProgressOpen(null));
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!user) return;
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
        <div className="flex w-full items-center gap-1">
          <span className="basis-1/3">Weight:</span>
          <input
            className="flex w-full basis-2/3 rounded-md border bg-transparent px-2"
            type="number"
            name="weight"
            placeholder="Weight"
            value={String(progressState.weight)}
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
    </Modal>
  );
};

export default ProgressItemModal;
