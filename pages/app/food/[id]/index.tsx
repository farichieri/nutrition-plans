import { fetchFoodByID } from "@/firebase/helpers/Food";
import { Food, FoodGroup } from "@/types/foodTypes";
import { NewFood } from "@/types/initialTypes";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BackButton from "@/components/Back/BackButton";
import FoodActions from "@/components/Premium/Food/FoodActions/FoodActions";
import Image from "next/image";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import FoodNutrition from "@/components/Premium/Food/FoodNutrition";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const foodS = foodsSearched[id as keyof FoodGroup];
  const [food, setFood] = useState(foodS || NewFood);

  useEffect(() => {
    if (!food.food_id && typeof id === "string") {
      const fetchFoodID = async () => {
        const foodFetched: Food | null = await fetchFoodByID(id);
        foodFetched && setFood(foodFetched);
      };
      fetchFoodID();
    }
  }, []);

  return (
    <PremiumLayout>
      {food && (
        <section className="flex w-full select-none flex-col gap-14 pb-24 pt-4">
          <div className="flex max-w-lg flex-col gap-10 ">
            <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex w-full items-center gap-10 px-2 py-2 backdrop-blur-lg">
              <BackButton />
              <span className="text-3xl font-semibold">{food.food_name}</span>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-start gap-10 p-4 sm:px-10">
            <div className="flex-col] flex w-full max-w-lg flex-col gap-5">
              <Image
                src={food.image}
                alt={`${food.food_name}`}
                width={250}
                height={250}
                className="w-50 pt-[var(--nav-h) m-auto mb-5 rounded-lg"
              />
              {food.food_id && <FoodActions foodID={food.food_id} />}
            </div>
            <div className="flex flex-wrap">
              <FoodNutrition isIngredient={false} foodProp={food} />
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
