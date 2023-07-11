import {
  CompatiblePlansC,
  fetchFoodByID,
  Food,
  FoodActions,
  FoodKind,
  FoodNutrition,
  getAllFoodsIds,
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
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Page({ food }: { food: Food }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { foodOpened, foodsSearched } = useSelector(selectFoodsSlice);
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

  if (!food || food?.id !== id || !defaultScale) {
    return (
      <PremiumLayout>
        <PremiumNav hideScrolling={false} />
        <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
          <BackButton />
        </SubPremiumNav>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
        <BackButton />
        <span className="truncate text-ellipsis font-semibold sm:text-xl">
          {food.name}
        </span>
        <div className="flex items-center justify-between gap-1">
          <AddToFavorite food={food} />
        </div>
      </SubPremiumNav>
      <section className="flex w-full select-none flex-col pt-[var(--nav-h)]">
        <div className="p-2 sm:p-4 lg:p-8">
          <div className="divide grid w-full gap-10 sm:grid-cols-fluid_lg sm:gap-20">
            <div className="flex w-full flex-col gap-5 ">
              <div className="flex w-full flex-col gap-5">
                <Image
                  src={food.imageURL}
                  alt={`${food.name}`}
                  width={500}
                  height={500}
                  className="m-auto h-[300px] w-full rounded-lg border border-gray-300/50 object-cover dark:border-transparent sm:w-[300px]"
                />
                <span className="text-center opacity-50">
                  {food.description}
                </span>
                {food.id && <FoodActions foodID={food.id} />}
                {food.kind === FoodKind.recipe && (
                  <div>
                    {food.kind === FoodKind.recipe && (
                      <div className="flex justify-between">
                        <span>Prep time:</span>
                        <span>{food.prepTime} minutes</span>
                      </div>
                    )}
                    {food.kind === FoodKind.recipe && (
                      <div className="flex justify-between">
                        <span>Cook time:</span>
                        <span>{food.cookTime} minutes</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <CompatiblePlansC compatiblePlans={food.compatiblePlans} />
              <div className="m-auto flex w-full max-w-lg">
                <ScaleSelector
                  setLocalScale={() => {}}
                  updateRoute={true}
                  food={food}
                  scaleAmount={Number(amount || defaultScale.scaleAmount)}
                  scaleName={String(scale || defaultScale.scaleName)}
                />
              </div>
            </div>
            <div className="flex w-full ">
              <FoodNutrition
                food={food}
                amount={Number(amount || defaultScale.scaleAmount)}
                scale={String(scale || defaultScale.scaleName)}
              />
            </div>
            {food.kind !== FoodKind.basic_food && (
              <div className="flex w-full flex-col gap-5  ">
                <div className="w-full ">
                  <Ingredients
                    food={food}
                    amount={Number(amount || defaultScale.scaleAmount)}
                    scale={String(scale || defaultScale.scaleName)}
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
    </PremiumLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getAllFoodsIds();
  if (res.result === "success") {
    const ids = res.data;
    const paths = ids.map((id) => ({
      params: { id },
    }));

    return { paths, fallback: true };
  }
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetchFoodByID(String(id));
  if (res.result === "success") {
    const food = res.data;
    return { props: { food } };
  }
  return { props: {} };
};
