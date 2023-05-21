import { fetchFoodByID } from "@/firebase/helpers/Food";
import { Food, FoodKind } from "@/types/foodTypes";
import { selectFoodsSlice, setFoodOpened } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BackButton from "@/components/Back/BackButton";
import FoodActions from "@/components/Premium/Food/FoodActions/FoodActions";
import FoodNutrition from "@/components/Premium/Food/FoodNutrition";
import Image from "next/image";
import Ingredients from "@/components/Premium/Recipe/Ingredients";
import Instructions from "@/components/Premium/Recipe/Instructions";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import ScaleSelector from "@/components/Premium/ScaleSelector/ScaleSelector";
import Spinner from "@/components/Loader/Spinner";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { foodOpened, foodsSearched } = useSelector(selectFoodsSlice);
  const foodData: Food | null = foodOpened.food;
  const { amount, scale } = router.query;

  useEffect(() => {
    if (typeof id === "string") {
      if (!foodsSearched[id]) {
        const fetchFoodID = async () => {
          const foodFetched: Food | null = await fetchFoodByID(id);
          foodFetched && dispatch(setFoodOpened(foodFetched));
        };
        fetchFoodID();
      } else {
        dispatch(setFoodOpened(foodsSearched[id]));
      }
    }
  }, [id]);

  if (foodData?.food_id !== id) {
    return (
      <PremiumLayout>
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
          <Spinner customClass="w-10 h-10 m-auto" />
        </div>
      </PremiumLayout>
    );
  }

  return (
    <PremiumLayout>
      {foodData && (
        <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
          <div className="flex flex-col gap-10 md:max-w-md ">
            <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex h-[var(--subnav-h)] w-screen items-center gap-10 border-b bg-white/80 px-4 backdrop-blur-lg dark:bg-black/80">
              <BackButton />
              <span className="font-semibold sm:text-xl">
                {foodData.food_name}
              </span>
            </div>
          </div>
          <div className="flex min-h-[100vh] flex-col items-start justify-start gap-5 bg-white px-4 pb-4 pt-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:min-h-[calc(100vh_-_6rem_-_1vw)] sm:gap-5 sm:rounded-lg sm:border sm:px-10">
            <div className="flex w-full flex-wrap gap-10">
              <div className="flex w-full flex-col gap-5 md:max-w-md">
                <div className="flex w-full flex-col gap-5">
                  <Image
                    src={foodData.image}
                    alt={`${foodData.food_name}`}
                    width={500}
                    height={500}
                    className="m-auto h-[250px] w-[250px] rounded-lg object-cover"
                  />
                  <span className="text-center opacity-50">
                    {foodData.food_description}
                  </span>
                  {foodData.food_id && (
                    <FoodActions foodID={foodData.food_id} />
                  )}
                </div>
                <div className="m-auto flex w-full max-w-lg">
                  <ScaleSelector
                    food={foodData}
                    amount={Number(amount || foodData.scale_amount)}
                    scale={String(scale || foodData.scale_name)}
                  />
                </div>
              </div>
              <div className="flex w-full md:max-w-md">
                <FoodNutrition
                  food={foodData}
                  amount={Number(amount || foodData.scale_amount)}
                  scale={String(scale || foodData.scale_name)}
                />
              </div>
              {foodData.kind !== FoodKind.basic_food && (
                <div className="flex w-full flex-col gap-5 md:max-w-md ">
                  <div className="w-full md:max-w-md">
                    <Ingredients
                      food={foodData}
                      amount={Number(amount || foodData.scale_amount)}
                      scale={String(scale || foodData.scale_name)}
                    />
                  </div>
                  {foodData.instructions.length > 0 && (
                    <div className="w-full md:max-w-md">
                      <Instructions instructions={foodData.instructions} />
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
