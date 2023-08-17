import { Diet } from "@/features/plans";
import { FC, useEffect, useState } from "react";
import { fetchDietByDate, updateDiet } from "@/features/plans/services";
import { LuFileEdit, LuSave } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { setDiet } from "@/features/plans/slice";
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

  useEffect(() => {
    setIsEditing(false);
  }, [date]);

  return (
    <>
      {isEditing ? (
        <div className="fixed bottom-0 left-1/2 z-[150] flex h-[var(--mobile-sidenav-h)] w-full -translate-x-1/2 items-center justify-center gap-4 border-t-2 border-green-500 bg-primary-color px-4 py-1">
          <button
            className="flex h-9  items-center justify-center gap-1 rounded-3xl border border-gray-500 bg-gray-500/20 px-3 py-1 hover:bg-gray-500/50 active:bg-gray-500"
            onClick={cancelChanges}
          >
            <span>Cancel</span>
            {isCanceling ? (
              <Spinner customClass="h-5 w-5" />
            ) : (
              <MdOutlineCancel className="h-5 w-5" />
            )}
          </button>
          <button
            className="flex h-9 items-center justify-center gap-1 rounded-3xl border border-green-600 bg-green-500 px-3 py-1 text-white hover:bg-green-500/50 active:bg-green-500"
            onClick={toggleButton}
          >
            <span>Save</span>
            {isSaving ? (
              <Spinner customClass="h-5 w-5 stroke-white" />
            ) : (
              <LuSave className="h-5 w-5" />
            )}
          </button>
        </div>
      ) : (
        <button
          className="flex h-9 items-center justify-center gap-1 rounded-3xl border border-green-600 bg-green-500 px-3 py-1 text-white hover:bg-green-500/50 active:bg-green-500"
          onClick={toggleButton}
        >
          <span>Edit Day</span>
          <LuFileEdit className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default SaveAndEditButton;
