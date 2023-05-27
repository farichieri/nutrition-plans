import { createUserMeal } from "@/firebase/helpers/Meals";
import { FC } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectMealsSlice, setAddNewUserMeal } from "@/store/slices/mealsSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserMeal } from "@/types/mealsSettingsTypes";
import Modal from "@/components/Modal/Modal";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface Props {
  isCreating: null | UserMeal;
  setIsCreating: Function;
  setOpenSelector: Function;
  index: number;
}

const AddMealSelector: FC<Props> = ({
  isCreating,
  setIsCreating,
  setOpenSelector,
  index,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { mealsSettings } = useSelector(selectMealsSlice);

  const handleAddUserMeal = async (mealSetting: UserMeal) => {
    if (!user) return;
    if (isCreating) return;
    setIsCreating(mealSetting);
    const newMealSetting = {
      ...mealSetting,
      order: index,
    };
    const res = await createUserMeal(user, newMealSetting);
    if (!res?.error && res?.mealSettingAdded) {
      dispatch(setAddNewUserMeal(res.mealSettingAdded));
      setOpenSelector(false);
    } else {
      alert("Error creating recipe");
    }
    setIsCreating(null);
  };

  return (
    <Modal onClose={() => setOpenSelector(false)}>
      <div className="flex w-96 flex-col gap-5 p-5">
        <span className="mx-auto text-center  text-xl font-semibold">
          Select the Meal Template
        </span>
        <div className="flex flex-col gap-2 ">
          {Object.keys(mealsSettings).map((meal_id) => (
            <div
              key={meal_id}
              className="flex items-center justify-between rounded-md border "
            >
              <span className="px-4 py-0 font-semibold text-green-500">
                {mealsSettings[meal_id].name}
              </span>
              <SubmitButton
                className={"flex h-9 w-20 text-sm"}
                onClick={() => handleAddUserMeal(mealsSettings[meal_id])}
                loadMessage={""}
                content="Select"
                isLoading={isCreating === mealsSettings[meal_id] ? true : false}
                isDisabled={false}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AddMealSelector;
