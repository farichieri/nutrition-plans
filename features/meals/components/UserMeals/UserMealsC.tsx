import {
  UserMeal,
  UserMeals,
  Meals,
  ConfirmDeleteMeal,
  AddMealSelector,
} from "@/features/meals";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
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
    <Box id="tour-profile_meals-1" customClass="max-w-3xl w-full">
      <BoxMainContent customClass="flex-col gap-5">
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
      </BoxMainContent>
      <BoxBottomBar>
        <SubmitButton
          className={"ml-auto flex h-8 w-32 text-sm"}
          onClick={() => setOpenSelector(true)}
          loadMessage={""}
          content="Add Meal"
          isLoading={false}
          isDisabled={false}
          id="tour-profile_meals-2"
        />
      </BoxBottomBar>
    </Box>
  );
};

export default UserMealsC;
