import {
  selectMealsSlice,
  usePostUserMealMutation,
  UserMeal,
} from "@/features/meals";
import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
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
  const { user } = useSelector(selectAuthSlice);
  const { mealsSettings } = useSelector(selectMealsSlice);
  const [postUserMeal] = usePostUserMealMutation();

  const handleAddUserMeal = async (mealSetting: UserMeal) => {
    if (!user) return;
    if (isCreating) return;
    setIsCreating(mealSetting);
    const newMealSetting = {
      ...mealSetting,
      order: index,
      mealSetting: mealSetting.id,
    };
    const res = await postUserMeal({ user, userMeal: newMealSetting });
    if (!("error" in res)) {
      setOpenSelector(false);
      toast.success("Meal added successfully.");
    } else {
      toast.error("Error adding meal.");
    }
    setIsCreating(null);
  };

  return (
    <Modal onClose={() => setOpenSelector(false)}>
      <div className="flex w-xs max-w-[95vw] flex-col gap-5 px-4 py-8 sm:w-md sm:px-10">
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
