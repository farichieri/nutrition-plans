import {
  UserMeal,
  UserMeals,
  Meals,
  ConfirmDeleteMeal,
  AddMealSelector,
} from "@/features/meals";
import { FC, useState } from "react";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface Props {
  meals: UserMeals;
}

const UserMealsC: FC<Props> = ({ meals }) => {
  const [openSelector, setOpenSelector] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<null | UserMeal>(null);
  const [isCreating, setIsCreating] = useState<null | UserMeal>(null);
  const length = Object.keys(meals).length;
  const noData = length < 1;

  const handleConfirmDelete = (mealSetting: UserMeal) => {
    setConfirmDelete(mealSetting);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-md border bg-white/50 p-5 dark:bg-black/50">
      {confirmDelete && (
        <ConfirmDeleteMeal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
        />
      )}
      {openSelector && (
        <AddMealSelector
          isCreating={isCreating}
          index={length}
          setIsCreating={setIsCreating}
          setOpenSelector={setOpenSelector}
        />
      )}
      <div>
        <span className="text-2xl font-semibold">My meals:</span>
      </div>
      {noData ? (
        <div>No meals found</div>
      ) : (
        <Meals meals={meals} handleConfirmDelete={handleConfirmDelete} />
      )}
      <div className="ml-auto">
        <SubmitButton
          className={"flex h-8 w-32 text-sm"}
          onClick={() => setOpenSelector(true)}
          loadMessage={""}
          content="Add Meal"
          isLoading={false}
          isDisabled={false}
        />
      </div>
    </div>
  );
};

export default UserMealsC;
