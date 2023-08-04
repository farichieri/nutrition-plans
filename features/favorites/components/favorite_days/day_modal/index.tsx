import {
  deleteLibraryDay,
  removeFavoritePlan,
  selectFavoritesSlice,
} from "@/features/favorites";
import { ActionButton } from "@/components/Buttons";
import { DietMeal, Nutrition } from "@/features/plans";
import { FC, useState } from "react";
import { FoodGroupArray } from "@/features/foods";
import { formatTwoDecimals, getNutritionMerged } from "@/utils";
import { selectAuthSlice } from "@/features/authentication";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import BlurImage from "@/components/blur-image";
import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const PlanModal: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector(selectAuthSlice);
  const { favoritePlans } = useSelector(selectFavoritesSlice);
  const diet = favoritePlans[String(id)];
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
      dispatch(removeFavoritePlan(diet));
      router.push("/app/library/days");
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
                      dietMealFoodsArr.map((food, index) => {
                        if (!food.id) return <></>;
                        const scaleFormatted = formatTwoDecimals(
                          food.scaleAmount
                        );

                        return (
                          <div
                            key={food.id}
                            className={`flex w-full items-center gap-1 px-0 hover:bg-slate-500/20  active:bg-slate-500/50 `}
                          >
                            <Link
                              key={food.id}
                              className="flex w-full"
                              href={`/app/food/${food.id}?amount=${food.scaleAmount}&scale=${food.scaleName}`}
                            >
                              <div
                                className={`flex w-full gap-1 ${
                                  food.isEaten ? "" : ""
                                }`}
                              >
                                <span className="relative h-16 w-16 min-w-[64px] sm:h-16 sm:w-16">
                                  <BlurImage
                                    image={{
                                      imageURL: food.imageURL,
                                      title: food.name!,
                                      id: food.id!,
                                    }}
                                  />
                                </span>
                                <div className="flex h-auto w-full pr-2">
                                  <div className="flex h-full w-full flex-col py-1">
                                    <div className="flex w-full max-w-max flex-col ">
                                      <span className="text-base font-semibold capitalize leading-4 tracking-tight">
                                        {food.name}
                                      </span>
                                      {/* <span className="text-sm opacity-50">{food.description}</span> */}
                                    </div>
                                    <div className="flex h-full flex-col">
                                      <div className="mt-auto  flex w-full flex-wrap items-baseline gap-1">
                                        <span className="text-sm">
                                          {scaleFormatted}
                                        </span>
                                        <span className="text-sm lowercase">
                                          {`${food.scaleName.toLowerCase()}${
                                            scaleFormatted > 1 ? "" : ""
                                          }`}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <Nutrition nutrients={diet.nutrients} planID={diet.planID} />
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

export default PlanModal;
