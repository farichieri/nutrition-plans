import {
  fetchDietByDate,
  Diet,
  updateDiet,
  deleteDiet,
} from "@/features/plans";
import { FC, useState } from "react";
import { LuFileEdit, LuSave } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { setDeleteDiet, setDiet } from "@/features/plans/slice";
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
  const [isCanceling, setIsCanceling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveDietOpened = async () => {
    setIsSaving(true);
    if (!diet) throw Error;
    const res = await updateDiet({ diet });
    if (res.result === "error") {
      toast.error("Error saving diet. Please try again.");
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
                  toast.success("Diet deleted successfully.");
                } else {
                  toast.error("Error deleting diet. Please try again.");
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
      { duration: 5000 }
    );
  };

  return (
    <div className="flex w-auto items-center justify-between gap-2">
      {isEditing && (
        <button
          className="flex h-9  items-center justify-center gap-1 rounded-md border border-gray-500 bg-gray-500/20 px-3 py-1 hover:bg-gray-500/50 active:bg-gray-500"
          onClick={cancelChanges}
        >
          {isCanceling ? (
            <Spinner customClass="h-5 w-5" />
          ) : (
            <span>Cancel</span>
          )}
        </button>
      )}
      {isEditing && (
        <button
          className="flex h-9 items-center justify-center gap-1 rounded-md border border-red-500 bg-red-500/20 px-3 py-1 hover:bg-red-500/50 active:bg-red-500"
          onClick={handleDelete}
        >
          {isDeleting ? (
            <Spinner customClass="h-5 w-5" />
          ) : (
            <>
              <span>Delete</span>
              <MdDelete className="h-5 w-5" />
            </>
          )}
        </button>
      )}
      <button
        className="flex h-9 items-center justify-center gap-1 rounded-md border border-green-500 bg-green-500/20 px-3 py-1 hover:bg-green-500/50 active:bg-green-500"
        onClick={toggleButton}
      >
        {isEditing ? (
          <>
            {isSaving ? (
              <Spinner customClass="h-5 w-5" />
            ) : (
              <>
                <span>Save</span>
                <LuSave className="h-5 w-5" />
              </>
            )}
          </>
        ) : (
          <>
            <span>Edit</span>
            <LuFileEdit className="h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default SaveAndEditButton;
