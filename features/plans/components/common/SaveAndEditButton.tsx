import {
  useRefreshDietByDateMutation,
  useUpdateDietMutation,
} from "@/features/plans/services";
import { Diet } from "@/features/plans";
import { FC, useEffect } from "react";
import { LuFileEdit, LuSave } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-hot-toast";
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
  const [refreshDietByDate, { isLoading: isCanceling }] =
    useRefreshDietByDateMutation();
  const [updateDiet, { isLoading: isSaving }] = useUpdateDietMutation();

  const saveDietOpened = async () => {
    if (!diet) throw Error;
    const res = await updateDiet({ diet });
    if ("error" in res) {
      toast.error("Error saving diet. Please try again.");
    }
  };

  const cancelChanges = async () => {
    const res = await refreshDietByDate({ date, userID: user.id });
    if (!("error" in res)) {
      throw new Error("Error Canceling. Please try again.");
    }
    setIsEditing(false);
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
      {isEditing && (
        <div className="fixed bottom-0 left-1/2 z-[150] flex h-[var(--mobile-sidenav-h)] w-full -translate-x-1/2 items-center justify-center gap-4 border-t border-green-500 bg-primary-color px-4 py-1">
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
      )}
      <button
        id="tour-dayPlan-4"
        className="flex h-9 items-center justify-center gap-1 rounded-3xl border border-green-600 bg-green-500 px-3 py-1 text-white hover:bg-green-500/50 active:bg-green-500"
        onClick={toggleButton}
      >
        <span>Edit Day</span>
        <LuFileEdit className="h-5 w-5" />
      </button>
    </>
  );
};

export default SaveAndEditButton;
