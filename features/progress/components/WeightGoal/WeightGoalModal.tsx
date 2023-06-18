import {
  WeightGoal,
  updateUser,
  selectAuthSlice,
  setUpdateUser,
  initialWeightGoal,
} from "@/features/authentication";
import { ButtonType } from "@/types";
import { FC, useEffect, useState } from "react";
import { formatISO } from "date-fns";
import { getWeight, getWeightInKg, getWeightUnit } from "@/utils/calculations";
import { setAddWeightGoalOpen } from "@/features/progress";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "@/components/Buttons/ActionButton";
import Modal from "@/components/Modal/Modal";

interface Props {
  weightGoal: WeightGoal;
}

const WeightGoalModal: FC<Props> = ({ weightGoal }) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector(selectAuthSlice);

  if (!user) return <></>;

  const { measurement_unit } = user;
  const [weightGoalState, setWeightGoalState] = useState<WeightGoal>({
    created_at: weightGoal?.created_at || null,
    due_date: weightGoal?.due_date || null,
    weight_goal_in_kg: weightGoal?.weight_goal_in_kg || null,
  });
  const addGoal = weightGoal === undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const valueF = name === "weight_goal_in_kg" ? Number(value) : value;
    setWeightGoalState({
      ...weightGoalState,
      [name]: valueF,
    });
  };

  const handleClose = () => {
    dispatch(setAddWeightGoalOpen(false));
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    const userUpdated = {
      ...user,
      weight_goal: {
        ...weightGoalState,
        weight_goal_in_kg: getWeightInKg({
          from: measurement_unit,
          weight: Number(weightGoalState.weight_goal_in_kg),
        }),
        created_at: formatISO(new Date()),
      },
    };
    const res = await updateUser(userUpdated);
    if (res.result === "success") {
      dispatch(setUpdateUser(userUpdated));
      dispatch(setAddWeightGoalOpen(false));
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    const userUpdated = {
      ...user,
      weight_goal: initialWeightGoal,
    };
    const res = await updateUser(userUpdated);
    if (res.result === "success") {
      dispatch(setUpdateUser(userUpdated));
      dispatch(setAddWeightGoalOpen(false));
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    let weightFormatted = 0;
    if (measurement_unit) {
      weightFormatted = getWeight({
        to: measurement_unit,
        weight: Number(weightGoalState.weight_goal_in_kg),
      });
    }
    let weightGoalF: WeightGoal = {
      ...weightGoalState,
      weight_goal_in_kg: weightFormatted,
    };
    setWeightGoalState(weightGoalF);
  }, [measurement_unit]);

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
          <span className="basis-1/3">Due Date:</span>
          <input
            value={String(weightGoalState?.due_date)}
            onChange={handleChange}
            name="due_date"
            type="date"
            className="w-full basis-3/4 rounded-md border bg-transparent px-2 py-2"
          />
        </div>

        <div className="relative flex items-center gap-1">
          <span className="basis-1/3">Weight:</span>
          <span className="absolute right-2 select-none">
            {getWeightUnit({ from: measurement_unit })}
          </span>
          <input
            className="flex w-full basis-3/4 rounded-md border bg-transparent px-2 py-2"
            type="number"
            name="weight_goal_in_kg"
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
            isDisabled={false}
            type={ButtonType.delete}
            className="w-full"
            onClick={handleDelete}
            action="submit"
          />
          <ActionButton
            loadMessage="Saving..."
            content={addGoal ? "Add" : "Save"}
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

export default WeightGoalModal;
