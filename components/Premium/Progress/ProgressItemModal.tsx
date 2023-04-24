import { FC, useEffect, useState } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  setDeleteProgress,
  setProgressOpen,
  setUpdateProgress,
} from "@/store/slices/progressSlice";
import { deleteProgress, updateProgress } from "@/firebase/helpers/Progress";
import { ButtonAction, ProgressItem } from "@/types/types";
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
    if (!res?.error) {
      dispatch(setUpdateProgress(progressUpdated));
      dispatch(setProgressOpen(null));
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    const res = await deleteProgress(user, progressItem);
    if (!res?.error) {
      dispatch(setDeleteProgress(progressItem.date));
      dispatch(setProgressOpen(null));
    }
    setIsDeleting(false);
  };

  return (
    <Modal onClose={handleClose}>
      <div className="flex flex-col gap-3 p-10">
        <span className="text-center text-xl font-semibold">Edit Progress</span>
        <div className="flex items-center gap-1">
          <span>Date:</span>
          <span>{progressItem.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Weight:</span>
          <input
            className="flex w-full rounded-md border bg-transparent px-2"
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
            action={ButtonAction.delete}
            className="w-full"
            onClick={handleDelete}
          />
          <ActionButton
            loadMessage="Saving..."
            content="Save"
            isLoading={isSaving}
            isDisabled={isDisabled}
            action={ButtonAction.save}
            className="w-full"
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProgressItemModal;
