"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { ActionButton } from "@/components/Buttons";
import Spinner from "@/components/Loader/Spinner";
import Modal from "@/components/Modal/Modal";
import { selectAuthSlice } from "@/features/authentication";
import { FoodGroupArray } from "@/features/foods";
import {
  deleteLibraryDay,
  removeDietFromLibrary,
  selectLibrarySlice,
} from "@/features/library";
import { DietMeal, DietNutrition, FoodInMealCard } from "@/features/plans";
import { getNutritionMerged } from "@/utils";

interface Props {}

const SavedDietModal: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector(selectAuthSlice);
  const { libraryDiets } = useSelector(selectLibrarySlice);
  const diet = libraryDiets[String(id)];
  const [isLoading, setIsLoading] = useState({
    delete: false,
  });

  if (!diet) return <></>;

  const isEditing = false;

  if (!user)
    return (
      <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
        <Spinner customClass="h-9 w-9 m-auto" />
      </div>
    );

  const calories = diet?.nutrients?.calories;

  const handleClose = () => {
    router.push("/app/library/days");
  };

  const handleDelete = async () => {
    try {
      setIsLoading({ ...isLoading, delete: true });
      const res = await deleteLibraryDay({ user, diet });
      if (res.result === "error") throw new Error("Error deleting day");
      dispatch(removeDietFromLibrary(diet));
      router.push("/app/library/days");
      toast.success("Day deleted");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting day");
    } finally {
      setIsLoading({ ...isLoading, delete: false });
    }
  };

  return (
    <Modal onClose={handleClose}>
      <div
        className={`flex max-h-[95vh] w-xl max-w-[95vw] flex-col items-center justify-start gap-2 overflow-y-auto p-2 pt-10 `}
      >
        <div className="flex w-full flex-col">
          <span className="font-semibold">{diet.name}</span>
          <span className="text-sm opacity-70">{diet.description}</span>
        </div>
        <div className="flex w-full items-center border-b px-2 py-1">
          {diet && (
            <span className="mr-auto text-xl font-semibold capitalize text-green-500">
              {diet?.planID?.replaceAll("_", " ")}
            </span>
          )}
          {calories && (
            <span className="px-4 text-xs opacity-70">{calories} calories</span>
          )}
        </div>
        <div className="flex h-auto w-full flex-col gap-2">
          {Object.values(diet?.meals)
            .sort((a: any, b: any) => Number(a.order) - Number(b.order))
            .map((dietMeal: DietMeal) => {
              const nutritionMerged = getNutritionMerged(dietMeal.foods);
              const { calories } = nutritionMerged;
              const dietMealFoodsArr: FoodGroupArray = Object.values(
                dietMeal.foods
              ).sort((a, b) => a.order - b.order);
              return (
                <div
                  key={dietMeal.id}
                  className={` flex h-auto w-full flex-col overflow-auto rounded-xl border bg-white dark:bg-gray-500/20`}
                >
                  <div
                    className={`flex items-center gap-5 bg-black/10 px-2 py-1 text-center`}
                  >
                    <span className="text-xl font-semibold capitalize">
                      {dietMeal.name}
                    </span>
                    <span className="ml-auto text-xs opacity-50">
                      {calories} calories
                    </span>
                  </div>

                  <div
                    className={`w-full divide-y divide-green-500/10 overflow-hidden`}
                  >
                    {dietMealFoodsArr.length < 1 && !isEditing ? (
                      <span className="m-2 flex h-10 text-sm opacity-50">
                        No foods planned yet.
                      </span>
                    ) : (
                      dietMealFoodsArr.map((food, index) => (
                        <FoodInMealCard
                          food={food}
                          isEditable={false}
                          isEditing={false}
                          key={food.id}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <DietNutrition
          nutrients={diet.nutrients}
          planID={diet.planID}
          diet={diet}
          isEditing={isEditing}
        />
        <div className="p-2">
          <ActionButton
            type="delete"
            content="Delete"
            isDisabled={false}
            isLoading={isLoading.delete}
            loadMessage="Deleting..."
            onClick={handleDelete}
            action="button"
            className=""
          />
        </div>
      </div>
    </Modal>
  );
};

export default SavedDietModal;
