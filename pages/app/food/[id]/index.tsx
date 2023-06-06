import {
  fetchFoodByID,
  Food,
  FoodActions,
  FoodKind,
  FoodNutrition,
  Ingredients,
  Instructions,
  selectFoodsSlice,
  setFoodOpened,
  CompatiblePlansC,
  ScaleSelector,
} from "@/features/foods";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BackButton from "@/components/Buttons/BackButton";
import Image from "next/image";
import PremiumLayout from "@/layouts/PremiumLayout";
import Spinner from "@/components/Loader/Spinner";
import AddToFavorite from "@/features/favorites/components/AddToFavorite";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { foodOpened, foodsSearched } = useSelector(selectFoodsSlice);
  const food: Food | null = foodOpened.food;
  const { amount, scale } = router.query;
  const defaultScale = food?.scales.find((scale) => scale.is_default === true);

  useEffect(() => {
    if (typeof id === "string") {
      if (!foodsSearched[id]) {
        const fetchFoodID = async () => {
          const res = await fetchFoodByID(id);
          if (res.result === "success") {
            dispatch(setFoodOpened(res.data));
          }
        };
        fetchFoodID();
      } else {
        dispatch(setFoodOpened(foodsSearched[id]));
      }
    }
  }, [id, foodsSearched, dispatch]);

  if (!food || food?.food_id !== id || !defaultScale) {
    return (
      <PremiumLayout>
        <div className="flex flex-col gap-10 md:max-w-md ">
          <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex h-[var(--subnav-h)] w-screen items-center gap-10 border-b bg-white/80 px-4 backdrop-blur-lg dark:bg-black/80">
            <BackButton />
          </div>
        </div>
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
          <Spinner customClass="w-10 h-10 m-auto" />
        </div>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout>
      {food && (
        <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
          <div className="">
            <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex h-[var(--subnav-h)] w-screen items-center justify-between gap-4 border-b bg-white/80 px-4 backdrop-blur-lg dark:bg-black/80 sm:justify-start sm:gap-10">
              <BackButton />
              <span className="truncate text-ellipsis font-semibold sm:text-xl">
                {food.food_name}
              </span>
              <AddToFavorite foodID={food.food_id} />
            </div>
          </div>
          <div className="flex min-h-[100vh] flex-col items-start justify-start gap-5 bg-white px-4 py-8 pb-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:min-h-[calc(100vh_-_6rem_-_1vw)] sm:gap-5 sm:rounded-lg sm:border sm:px-10">
            <div className="flex w-full flex-wrap gap-10">
              <div className="flex w-full flex-col gap-5 md:max-w-md">
                <div className="flex w-full flex-col gap-5">
                  <Image
                    src={food.image}
                    alt={`${food.food_name}`}
                    width={500}
                    height={500}
                    className="m-auto h-[300px] w-[300px] rounded-lg object-cover"
                  />
                  <span className="text-center opacity-50">
                    {food.food_description}
                  </span>
                  {food.food_id && <FoodActions foodID={food.food_id} />}
                  {food.kind === FoodKind.recipe && (
                    <div>
                      {food.kind === FoodKind.recipe && (
                        <div className="flex justify-between">
                          <span>Prep time:</span>
                          <span>{food.prep_time} minutes</span>
                        </div>
                      )}
                      {food.kind === FoodKind.recipe && (
                        <div className="flex justify-between">
                          <span>Cook time:</span>
                          <span>{food.cook_time} minutes</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <CompatiblePlansC compatible_plans={food.compatible_plans} />
                <div className="m-auto flex w-full max-w-lg">
                  <ScaleSelector
                    food={food}
                    amount={Number(amount || defaultScale.scale_amount)}
                    scale={String(scale || defaultScale.scale_name)}
                  />
                </div>
              </div>
              <div className="flex w-full md:max-w-md">
                <FoodNutrition
                  food={food}
                  amount={Number(amount || defaultScale.scale_amount)}
                  scale={String(scale || defaultScale.scale_name)}
                />
              </div>
              {food.kind !== FoodKind.basic_food && (
                <div className="flex w-full flex-col gap-5 md:max-w-md ">
                  <div className="w-full md:max-w-md">
                    <Ingredients
                      food={food}
                      amount={Number(amount || defaultScale.scale_amount)}
                      scale={String(scale || defaultScale.scale_name)}
                    />
                  </div>
                  {food.instructions.length > 0 && (
                    <div className="w-full md:max-w-md">
                      <Instructions instructions={food.instructions} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </PremiumLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
