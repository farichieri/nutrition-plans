import { FC, useEffect, useState } from "react";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { setAddWeightGoalOpen } from "@/store/slices/progressSlice";
import { ButtonAction, WeightGoal } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal/Modal";
import ActionButton from "@/components/Buttons/ActionButton";
import { updateUser } from "@/firebase/helpers/Auth";

interface Props {
  weightGoal: WeightGoal | undefined;
}

const WeightGoalModal: FC<Props> = ({ weightGoal }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const [weightGoalState, setWeightGoalState] = useState<WeightGoal | null>({
    created_at: weightGoal?.created_at || null,
    due_date: weightGoal?.due_date || null,
    weight_goal_in_kg: weightGoal?.weight_goal_in_kg || null,
  });
  const addGoal = weightGoal === undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const valueF = name === "weight_in_kg" ? Number(value) : value;
    // setWeightGoalState({
    //   ...weightGoalState,
    //   [name]: valueF,
    // });
  };

  const handleClose = () => {
    dispatch(setAddWeightGoalOpen(false));
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    const userUpdated = {
      ...user,
      weightGoal: weightGoalState,
    };
    const res = await updateUser(userUpdated);
    if (!res?.error) {
      dispatch(setUpdateUser(userUpdated));
      dispatch(setAddWeightGoalOpen(false));
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    // const res = await deleteProgress(user, weightGoal);
    // if (!res?.error) {
    //   dispatch(setDeleteProgress(weightGoal.due_date));
    //   dispatch(setAddWeightGoalOpen(false));
    // }
    setIsDeleting(false);
  };

  useEffect(() => {
    if (JSON.stringify(weightGoal) !== JSON.stringify(weightGoalState)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [weightGoal, weightGoalState]);

  return (
    <Modal onClose={handleClose}>
      <div className="flex flex-col gap-3 p-10">
        <span className="text-center text-xl font-semibold">
          {addGoal ? "Add Goal" : "Edit Goal"}
        </span>
        <div className="flex items-center gap-1">
          <span>Due Date:</span>
          <span>{weightGoalState?.due_date}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Weight:</span>
          <input
            className="flex w-full rounded-md border bg-transparent px-2"
            type="number"
            name="weight_in_kg"
            placeholder="Weight"
            value={String(weightGoalState?.weight_goal_in_kg)}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-2 pt-5">
          <ActionButton
            loadMessage="Deleting..."
            content={addGoal ? "Discard" : "Delete"}
            isLoading={isDeleting}
            isDisabled={isDisabled}
            action={ButtonAction.delete}
            className="w-full"
            onClick={handleDelete}
          />
          <ActionButton
            loadMessage="Saving..."
            content={addGoal ? "Add" : "Save"}
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

export default WeightGoalModal;
