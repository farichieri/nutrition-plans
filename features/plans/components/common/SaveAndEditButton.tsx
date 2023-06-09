import { Diet } from "../../types";
import { FC, useState } from "react";
import { PlansEnum } from "@/types";
import {
  fetchDietByDate,
  postDietToUserDiets,
  updateDiet,
} from "../../services";
import { UserAccount } from "@/features/authentication";
import Spinner from "@/components/Loader/Spinner";
import { setDiet } from "@/features/plans";
import { useDispatch } from "react-redux";

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

  const saveDietOpened = async () => {
    setIsSaving(true);
    try {
      if (!diet) throw Error;
      const res = await updateDiet({ diet });
      if (res.result === "error") {
        throw Error;
      }
    } catch (error) {
      console.log(error);
    }
    setIsSaving(false);
  };

  const cancelChanges = async () => {
    setIsCanceling(true);
    try {
      const res = await fetchDietByDate({ date, user });
      if (res.result === "success") {
        dispatch(setDiet(res.data));
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className="ml-auto flex items-center gap-2">
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
        {isEditing ? "Save Changes" : "Edit"}
        {isSaving && <Spinner customClass="h-4 w-4" />}
      </button>
    </div>
  );
};

export default SaveAndEditButton;
