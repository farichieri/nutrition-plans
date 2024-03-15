import { TextArea } from "@/components";
import { CheckButton } from "@/components/Buttons";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useUpdateDietMutation } from "../../services";
import { setDietExercise } from "../../slice";
import { Diet } from "../../types";

interface Props {
  diet: Diet;
  isEditing: boolean;
}

const Exercise: FC<Props> = ({ diet, isEditing }) => {
  const dispatch = useDispatch();
  const { exercise } = diet;
  const [updateDiet] = useUpdateDietMutation();

  if (!exercise) return <></>;

  const { exercised, note, isPlanned } = exercise;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const newExercise = { ...exercise, note: value };
    dispatch(setDietExercise({ diet: diet, exercise: newExercise }));
  };

  const handleCheck = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = !exercised;

    const newExercise = { ...exercise, exercised: value };

    try {
      dispatch(setDietExercise({ diet, exercise: newExercise }));

      const dietUpdated: Diet = {
        ...diet,
        exercise: newExercise,
      };
      const res = await updateDiet({ diet: dietUpdated, noDispatch: true });
      if ("error" in res) {
        throw Error;
      }
    } catch (error) {
      toast.error("Error checking Exercise.");
      console.error(error);
    } finally {
    }
  };

  const handleSetPlanned = () => {
    const newExercise = { ...exercise, isPlanned: true };
    dispatch(setDietExercise({ diet: diet, exercise: newExercise }));
  };

  const handleRemoveExercise = () => {
    const newExercise = {
      isPlanned: false,
      exercised: false,
      note: null,
    };
    dispatch(setDietExercise({ diet: diet, exercise: newExercise }));
  };

  const customClass = isEditing
    ? "rounded-md border p-2"
    : "cursor-default select-none rounded-md bg-green-500/10 outline-none";

  if (!isPlanned && isEditing) {
    return (
      <button
        onClick={handleSetPlanned}
        className="mr-auto rounded-lg border border-red-500 bg-red-300/50 px-3 py-1.5"
      >
        Add Exercise💪
      </button>
    );
  }

  if (isPlanned || isEditing) {
    return (
      <div
        className={`flex items-center gap-1 rounded-xl border-b py-1 shadow-md dark:shadow-slate-500/20 ${
          exercised
            ? "bg-green-300 dark:bg-green-800"
            : "bg-white dark:bg-gray-500/20"
        }`}
      >
        <div className="flex w-full items-center justify-between px-2 ">
          <div className="flex w-full items-baseline gap-1">
            <span className="min-w-fit font-semibold text-red-500">
              💪 Exercise:
            </span>
            <TextArea
              handleChange={handleChange}
              value={note || ""}
              placeholder="Note..."
              readOnly={!isEditing}
              customClass={customClass}
              name="note"
              isRequired={false}
            />
          </div>
          <div className="flex h-10 w-10 items-center justify-center">
            {!isEditing ? (
              <CheckButton onClick={handleCheck} checked={exercised} />
            ) : (
              <button onClick={handleRemoveExercise}>
                <MdClose className="h-5 w-5 text-red-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Exercise;
