import {
  CompatiblePlansC,
  fetchFoodByID,
  Food,
  FoodActions,
  FoodKind,
  FoodNutrition,
  getDefaultScale,
  Ingredients,
  Instructions,
  ScaleSelector,
  selectFoodsSlice,
  setFoodOpened,
} from "@/features/foods";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AddToFavorite from "@/features/favorites/components/AddToFavorite";
import BackButton from "@/components/Buttons/BackButton";
import Image from "next/image";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import Spinner from "@/components/Loader/Spinner";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { foodOpened, foodsSearched } = useSelector(selectFoodsSlice);
  const food: Food | null = foodOpened.food;
  const { amount, scale } = router.query;
  const defaultScale = food && getDefaultScale(food.scales);

  useEffect(() => {
    if (typeof id === "string") {
      // if (!foodsSearched[id]) {
      const fetchFoodID = async () => {
        const res = await fetchFoodByID(id);
        if (res.result === "success") {
          dispatch(setFoodOpened(res.data));
        }
      };
      fetchFoodID();
      // } else {
      //   dispatch(setFoodOpened(foodsSearched[id]));
      // }
    }
  }, [id, foodsSearched, dispatch]);

  if (!food || food?.food_id !== id || !defaultScale) {
    return (
      <PremiumLayout>
        <SubPremiumNav title={""}>
          <BackButton />
        </SubPremiumNav>
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center opacity-50">
          <Spinner customClass="w-5 h-5 m-auto" />
        </div>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout>
      {food && (
        <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
          <div className="">
            <PremiumNav hideScrolling={false} />
            <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
              <BackButton />
              <span className="truncate text-ellipsis font-semibold sm:text-xl">
                {food.food_name}
              </span>
              <div className="flex items-center justify-between gap-1">
                <AddToFavorite food={food} />
              </div>
            </SubPremiumNav>
          </div>

          <div className="p-2 sm:p-4 lg:p-8">
            <div className="divide grid w-full gap-10 sm:grid-cols-fluid_lg sm:gap-20">
              <div className="flex w-full flex-col gap-5 ">
                <div className="flex w-full flex-col gap-5">
                  <Image
                    src={food.image}
                    alt={`${food.food_name}`}
                    width={500}
                    height={500}
                    className="m-auto h-[300px] w-full rounded-lg border border-gray-300/50 object-cover dark:border-transparent sm:w-[300px]"
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
                    setLocalScale={() => {}}
                    updateRoute={true}
                    food={food}
                    scale_amount={Number(amount || defaultScale.scale_amount)}
                    scale_name={String(scale || defaultScale.scale_name)}
                  />
                </div>
              </div>
              <div className="flex w-full ">
                <FoodNutrition
                  food={food}
                  amount={Number(amount || defaultScale.scale_amount)}
                  scale={String(scale || defaultScale.scale_name)}
                />
              </div>
              {food.kind !== FoodKind.basic_food && (
                <div className="flex w-full flex-col gap-5  ">
                  <div className="w-full ">
                    <Ingredients
                      food={food}
                      amount={Number(amount || defaultScale.scale_amount)}
                      scale={String(scale || defaultScale.scale_name)}
                    />
                  </div>
                  {food.instructions.length > 0 && (
                    <div className="w-full ">
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
