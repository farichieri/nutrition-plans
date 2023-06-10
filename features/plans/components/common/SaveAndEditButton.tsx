import { Diet } from "../../types";
import { FC, useState } from "react";
import { deleteDiet, fetchDietByDate, updateDiet } from "../../services";
import { setDeleteDiet, setDiet } from "@/features/plans";
import { useDispatch } from "react-redux";
import { UserAccount } from "@/features/authentication";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  diet: Diet;
  date: string;
  user: UserAccount;
  isEditing: boolean;
  setIsEditing: Function;
}

const SaveAndEditButton: FC<Props> = ({
  diet,
  date,
  user,
  isEditing,
  setIsEditing,
}) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const saveDietOpened = async () => {
    setIsSaving(true);
    if (!diet) throw Error;
    const res = await updateDiet({ diet });
    if (res.result === "error") {
      console.log(res.error);
    }
    setIsSaving(false);
  };

  const cancelChanges = async () => {
    setIsCanceling(true);
    const res = await fetchDietByDate({ date, user });
    if (res.result === "success") dispatch(setDiet(res.data));
    setIsEditing(false);
    setIsCanceling(false);
  };

  const toggleButton = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      await saveDietOpened();
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteDiet(diet);
    if (res.result === "success") {
      dispatch(setDeleteDiet(diet));
    }
    setIsDeleting(false);
  };

  return (
    <div className="ml-auto flex items-center gap-2">
      {isEditing && (
        <button
          className="ml-auto flex items-center gap-1 rounded-md border border-red-500 px-3 py-1"
          onClick={handleDelete}
        >
          Clear
          {isDeleting && <Spinner customClass="h-4 w-4" />}
        </button>
      )}
      {isEditing && (
        <button
          className="ml-auto flex items-center gap-1 rounded-md border px-3 py-1"
          onClick={cancelChanges}
        >
          Cancel
          {isCanceling && <Spinner customClass="h-4 w-4" />}
        </button>
      )}
      <button
        className="ml-auto flex items-center gap-1 rounded-md border px-3 py-1"
        onClick={toggleButton}
      >
        {isEditing ? (
          <div className="flex items-center gap-1">
            Save
            <span className="material-icons-outlined">save</span>
          </div>
        ) : (
          <span className="material-icons-outlined">edit</span>
        )}
        {isSaving && <Spinner customClass="h-4 w-4" />}
      </button>
    </div>
  );
};

export default SaveAndEditButton;
