import { ActionButton } from "@/components/Buttons";
import { deleteLibraryMeal } from "../../services";
import { FC, useState } from "react";
import { FoodGroupArray } from "@/features/foods";
import { FoodInMealCard } from "@/features/plans";
import { getNutritionMerged } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { removeFavoriteMeal, selectFavoritesSlice } from "../../slice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const MealModal: FC<Props> = () => {
  const { favoriteMeals } = useSelector(selectFavoritesSlice);
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();
  const dispatch = useDispatch();
  const meal = favoriteMeals[String(router.query.id)];

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
      dispatch(removeFavoriteMeal(meal));
      router.push("/app/library/meals");
      toast.success("Day deleted");
    } catch (error) {
      console.log(error);
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
        <div
          key={meal.id}
          className={`min-h-20 flex w-full flex-col rounded-xl border `}
        >
          <div
            className={`flex items-center gap-2 rounded-t-xl border-b px-2 py-1 text-center `}
          >
            <span className="text-xl font-semibold capitalize">
              {meal.name}
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

export default MealModal;
