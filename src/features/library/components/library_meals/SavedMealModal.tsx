"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { ActionButton } from "@/components/Buttons";
import Spinner from "@/components/Loader/Spinner";
import Modal from "@/components/Modal/Modal";
import { selectAuthSlice } from "@/features/authentication";
import { FoodGroupArray } from "@/features/foods";
import { FoodInMealCard } from "@/features/plans";
import { getNutritionMerged } from "@/utils";

import { deleteLibraryMeal } from "../../services";
import { removeMealFromLibrary, selectLibrarySlice } from "../../slice";

interface Props {}

const SavedMealModal: FC<Props> = () => {
  const { libraryMeals } = useSelector(selectLibrarySlice);
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();
  const dispatch = useDispatch();
  const meal = libraryMeals[String(router.query.id)];

  const [isLoading, setIsLoading] = useState({
    delete: false,
  });

  if (!meal) return <></>;

  if (!user)
    return (
      <div className="fixed inset-0 mt-auto flex h-screen w-screen justify-center">
        <Spinner customClass="h-9 w-9 m-auto" />
      </div>
    );
  const handleClose = () => {
    router.push("/app/library/meals");
  };

  const nutritionMerged = getNutritionMerged(meal.foods);
  const { calories } = nutritionMerged;

  const dietMealFoodsArr: FoodGroupArray = Object.values(meal.foods).sort(
    (a, b) => a.order - b.order
  );

  const handleDelete = async () => {
    try {
      setIsLoading({ ...isLoading, delete: true });
      const res = await deleteLibraryMeal({ user, meal });
      if (res.result === "error") throw new Error("Error deleting day");
      dispatch(removeMealFromLibrary(meal));
      router.push("/app/library/meals");
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
          <span className="font-semibold">{meal.nameSaved}</span>
          <span className="text-sm opacity-70">{meal.description}</span>
        </div>
        <div
          key={meal.id}
          className={`min-h-20 flex w-full flex-col rounded-xl border `}
        >
          <div
            className={`flex items-center gap-2 rounded-t-xl border-b px-2 py-1 text-center `}
          >
            <span className="text-xl font-semibold capitalize text-green-500">
              {meal.planID?.replaceAll("_", " ")}
            </span>
            <span className="ml-auto px-2 text-xs opacity-50">
              {calories} calories
            </span>
          </div>
          <div className={`w-full divide-y overflow-hidden last:rounded-b-xl `}>
            {dietMealFoodsArr.map((food, index) => {
              if (!food.id) return <></>;
              return (
                <div
                  key={food.id}
                  className={` flex w-full items-center gap-1 px-0 hover:bg-slate-500/20  active:bg-slate-500/50 `}
                >
                  <Link
                    key={food.id}
                    className="flex w-full"
                    href={`/app/food/${food.id}?amount=${food.scaleAmount}&scale=${food.scaleName}`}
                  >
                    <FoodInMealCard
                      isEditable={false}
                      food={food}
                      isEditing={false}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
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

export default SavedMealModal;
