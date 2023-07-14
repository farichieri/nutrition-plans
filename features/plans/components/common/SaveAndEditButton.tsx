import {
  fetchDietByDate,
  Diet,
  updateDiet,
  deleteDiet,
} from "@/features/plans";
import { setDeleteDiet, setDiet } from "@/features/plans/slice";
import { FC, useState } from "react";
import { LuFileEdit, LuSave } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { User } from "@/features/authentication";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  diet: Diet;
  date: string;
  user: User;
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
    const res = await fetchDietByDate({ date, userID: user.id });
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
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-1">
          <span>
            Confirm <b>Delete</b>
          </span>
          <div className="flex gap-1">
            <button
              className="flex items-center gap-1 rounded-md border border-red-500 bg-red-500/20 px-3 py-1 hover:bg-red-500/50 active:bg-red-500"
              onClick={async () => {
                toast.dismiss(t.id);
                setIsDeleting(true);
                const res = await deleteDiet(diet);
                if (res.result === "success") {
                  dispatch(setDeleteDiet({ id: diet.id! }));
                }
                setIsDeleting(false);
              }}
            >
              Confirm
            </button>
            <button
              className="flex items-center gap-1 rounded-md border border-gray-500 bg-gray-500/20 px-3 py-1 hover:bg-gray-500/50 active:bg-gray-500"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Discard
            </button>
          </div>
        </div>
      ),
      { duration: 1000000 }
    );
  };

  return (
    <div className="flex w-auto items-center justify-between gap-2 ">
      {isEditing && (
        <button
          className="flex h-9 items-center gap-1 rounded-md border border-gray-500 bg-gray-500/20 px-3 py-1 hover:bg-gray-500/50 active:bg-gray-500"
          onClick={cancelChanges}
        >
          Cancel
          {isCanceling && <Spinner customClass="h-5 w-5" />}
        </button>
      )}
      {isEditing && (
        <button
          className="flex h-9 items-center gap-1 rounded-md border border-red-500 bg-red-500/20 px-3 py-1 hover:bg-red-500/50 active:bg-red-500"
          onClick={handleDelete}
        >
          Delete
          {isDeleting && <Spinner customClass="h-5 w-5" />}
          <MdDelete className="h-5 w-5" />
        </button>
      )}
      <button
        className="flex h-9 items-center gap-1 rounded-md border border-green-500 bg-green-500/20 px-3 py-1 hover:bg-green-500/50 active:bg-green-500"
        onClick={toggleButton}
      >
        {isEditing ? (
          <div className="flex items-center gap-1 ">
            Save
            <LuSave className="h-5 w-5" />
          </div>
        ) : (
          <LuFileEdit className="h-5 w-5" />
        )}
        {isSaving && <Spinner customClass="h-5 w-5" />}
      </button>
    </div>
  );
};

export default SaveAndEditButton;
