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

  const { measurementUnit } = user;
  const [weightGoalState, setWeightGoalState] = useState<WeightGoal>({
    createdAt: weightGoal?.createdAt || null,
    dueDate: weightGoal?.dueDate || null,
    weightGoalInKg: weightGoal?.weightGoalInKg || null,
  });
  const addGoal = weightGoal === undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const valueF = name === "weightGoalInKg" ? Number(value) : value;
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
    const fields = {
      weightGoal: {
        ...weightGoalState,
        weightGoalInKg: getWeightInKg({
          from: measurementUnit,
          weight: Number(weightGoalState.weightGoalInKg),
        }),
        createdAt: formatISO(new Date()),
      },
    };
    const res = await updateUser({ user, fields });
    if (res.result === "success") {
      dispatch(setUpdateUser({ user, fields }));
      dispatch(setAddWeightGoalOpen(false));
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    const fields = { weightGoal: initialWeightGoal };
    const res = await updateUser({ user, fields });
    if (res.result === "success") {
      dispatch(setUpdateUser({ user, fields }));
      dispatch(setAddWeightGoalOpen(false));
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    let weightFormatted = 0;
    if (measurementUnit) {
      weightFormatted = getWeight({
        to: measurementUnit,
        weight: Number(weightGoalState.weightGoalInKg),
      });
    }
    let weightGoalF: WeightGoal = {
      ...weightGoalState,
      weightGoalInKg: weightFormatted,
    };
    setWeightGoalState(weightGoalF);
  }, [measurementUnit]);

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
            value={String(weightGoalState?.dueDate)}
            onChange={handleChange}
            name="dueDate"
            type="date"
            className="w-full basis-3/4 rounded-md border bg-transparent px-2 py-2"
          />
        </div>

        <div className="relative flex items-center gap-1">
          <span className="basis-1/3">Weight:</span>
          <span className="absolute right-2 select-none">
            {getWeightUnit({ from: measurementUnit })}
          </span>
          <input
            className="flex w-full basis-3/4 rounded-md border bg-transparent px-2 py-2"
            type="number"
            name="weightGoalInKg"
            placeholder="Weight"
            value={String(weightGoalState?.weightGoalInKg)}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-2 pt-5">
          <ActionButton
            loadMessage="Deleting..."
            content={addGoal ? "Discard" : "Delete"}
            isLoading={isDeleting}
            isDisabled={false}
            type={ButtonType.Delete}
            className="w-full"
            onClick={handleDelete}
            action="submit"
          />
          <ActionButton
            loadMessage="Saving..."
            content={addGoal ? "Add" : "Save"}
            isLoading={isSaving}
            isDisabled={isDisabled}
            type={ButtonType.Save}
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
