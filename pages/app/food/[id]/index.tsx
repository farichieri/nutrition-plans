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
} from "@/features/foods";
import { AddFoodToLibrary } from "@/features/library";
import { GetStaticPaths, GetStaticProps } from "next";
import { PremiumSidebar } from "@/layouts";
import { selectAuthSlice } from "@/features/authentication";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTour } from "@/features/tours";
import { useWindowWidth } from "@/hooks";
import BackButton from "@/components/Buttons/BackButton";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import Image from "next/image";
import BlurImage from "@/components/blur-image";

export default function Page({ food }: { food: Food }) {
  const router = useRouter();
  const { id } = router.query;
  const { amount, scale } = router.query;
  const defaultScale = food && getDefaultScale(food.scales);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const { user } = useSelector(selectAuthSlice);

  useTour({
    name: "food",
    user: user,
    steps: () => [
      {
        title: "Food Details",
        intro:
          "In this section you will see the details of the food you have selected.",
      },
      {
        element: document.querySelector("#tour-food-0"),
        title: "Plans Compatibility",
        intro: "Here you can see the plans that are compatible with this food",
        position: "right",
      },
      {
        element: document.querySelector("#tour-food-1"),
        title: "Amount and Scale",
        intro:
          "Here you can select the amount and the scale of the food you want to see the nutrition facts.",
        position: "bottom",
      },
      {
        element: document.querySelector("#tour-food-2"),
        title: "Nutrition facts",
        intro:
          "Here you can see the nutrition facts of the food you have selected!",
        position: "left",
      },
      {
        element: document.querySelector("#tour-food-3"),
        title: "Add to Favorites",
        intro:
          "Here you can add the food to your library! So you can find it easily!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-food-4"),
        title: "Like and Dislike",
        intro:
          "Here you can like or dislike the food! So we can improve our food database and also know what you like and what you don't!",
        position: "right",
      },
    ],
  });

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
      {!isMobile && (
        <>
          <PremiumNav hideScrolling={false} />
          <PremiumSidebar />
        </>
      )}
      <SubPremiumNav
        title={""}
        customClass={`${isMobile ? "top-0" : "top-[var(--subnav-h)]"}`}
      >
        <BackButton />
        <span className="truncate text-ellipsis font-semibold sm:text-xl">
          {food.name}
        </span>
        <div className="flex items-center justify-between gap-1">
          <AddFoodToLibrary food={food} />
        </div>
      </SubPremiumNav>
      <section
        className={`flex w-full select-none flex-col ${
          isMobile ? "pt-0" : "pt-[var(--nav-h)]"
        }`}
      >
        <div className="p-2 sm:p-4 lg:p-8">
          <div className="divide grid w-full gap-10 sm:grid-cols-fluid_lg sm:gap-20">
            <div className="flex w-full flex-col gap-5 ">
              <div className="flex w-full flex-col gap-5">
                <div className="max-h-[50vh] overflow-auto rounded-lg object-cover shadow-md">
                  <BlurImage
                    src={food.imageURLs.resized_1200x900}
                    alt={food.name!}
                    width={1200}
                    height={900}
                  />
                </div>

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
              {food.note && (
                <div className="flex flex-col divide-y rounded-md border">
                  <span className="px-2 py-1 text-sm">Good to know:</span>
                  <span className="p-2 text-sm text-gray-500">{food.note}</span>
                </div>
              )}
              <CompatiblePlansC compatiblePlans={food.compatiblePlans} />
              <div className="m-auto flex w-full ">
                <ScaleSelector
                  setLocalScale={() => {}}
                  updateRoute={true}
                  food={food}
                  scaleAmount={Number(amount || defaultScale.scaleAmount)}
                  scaleName={String(scale || defaultScale.scaleName)}
                />
              </div>
            </div>
            <div id="tour-food-2" className="flex w-full">
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

// export const getServerSideProps: GetStaticProps = async (context) => {
//   const id = context.params?.id;
//   const res = await fetchFoodByID(String(id));
//   if (res.result === "success") {
//     const food = res.data;
//     return { props: { food } };
//   }
//   return { props: {} };
// };
