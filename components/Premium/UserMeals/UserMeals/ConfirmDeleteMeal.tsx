import { ButtonType } from "@/types/types";
import { deleteUserMeal } from "@/firebase/helpers/Meals";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { setDeleteUserMeal } from "@/store/slices/mealsSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserMeal } from "@/types/mealsSettingsTypes";
import ActionButton from "@/components/Buttons/ActionButton";
import Modal from "@/components/Modal/Modal";

interface Props {
  confirmDelete: null | UserMeal;
  setConfirmDelete: Function;
}

const ConfirmDeleteMeal: FC<Props> = ({ confirmDelete, setConfirmDelete }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector(selectAuthSlice);

  const handleDeleteUserMeal = async (mealSetting: UserMeal) => {
    if (!user) return;
    setIsDeleting(true);
    const res = await deleteUserMeal(user, mealSetting);
    if (!res?.error) {
      dispatch(setDeleteUserMeal(mealSetting));
      setConfirmDelete(null);
    } else {
      alert("Error deleting meal");
    }
    setIsDeleting(false);
  };

  if (!confirmDelete) return <></>;

  return (
    <Modal onClose={() => setConfirmDelete(null)}>
      <div className="flex w-xs flex-col gap-5 px-4 py-8 sm:w-md sm:px-10">
        <span className="mx-auto text-xl font-semibold">
          Confirm delete of {confirmDelete.name}
        </span>
        <div>
          <ActionButton
            loadMessage="Deleting..."
            content="Delete"
            isLoading={isDeleting}
            isDisabled={false}
            type={ButtonType.delete}
            className="mx-auto w-32"
            onClick={() => handleDeleteUserMeal(confirmDelete)}
            action="submit"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteMeal;
