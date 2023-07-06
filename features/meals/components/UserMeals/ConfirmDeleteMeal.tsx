import {
  deleteUserMeal,
  UserMeal,
  setUserMeals,
  selectMealsSlice,
} from "@/features/meals";
import { ButtonType } from "@/types";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { updateMealsOrders } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "@/components/Buttons/ActionButton";
import Modal from "@/components/Modal/Modal";
import { toast } from "react-hot-toast";

interface Props {
  confirmDelete: null | UserMeal;
  setConfirmDelete: Function;
}

const ConfirmDeleteMeal: FC<Props> = ({ confirmDelete, setConfirmDelete }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const { meals } = useSelector(selectMealsSlice);

  const handleDeleteUserMeal = async (userMeal: UserMeal) => {
    if (!user || !userMeal.id) return;
    setIsDeleting(true);
    const res = await deleteUserMeal(user, userMeal);
    if (res.result === "success") {
      const newUserMeals = {
        ...meals,
      };
      delete newUserMeals[userMeal.id];
      const userMealsArr = Object.values(newUserMeals);
      const res = await updateMealsOrders(userMealsArr, user);
      if (res.result === "success") {
        dispatch(setUserMeals(res.data));
        setConfirmDelete(null);
      }
      toast.success("Meal deleted successfully.");
    } else {
      toast.error("Error deleting meal.");
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
            type={ButtonType.Delete}
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
