import { fetchFoodByID, fetchFoodIngredients } from "@/firebase/helpers/Food";
import { Food, FoodGroup, Ingredient } from "@/types/foodTypes";
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
import Ingredients from "@/components/Premium/Recipe/Ingredients";
import Instructions from "@/components/Premium/Recipe/Instructions";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const foodS = foodsSearched[id as keyof FoodGroup];
  const [food, setFood] = useState(foodS || NewFood);

  useEffect(() => {
    if (typeof id === "string") {
      const fetchFoodID = async () => {
        const foodFetched: Food | null = await fetchFoodByID(id);
        foodFetched && setFood(foodFetched);
      };
      fetchFoodID();
    }
  }, [id]);

  const fetchFoods = async (ingredients: Ingredient[]) => {
    const ids = ingredients.map((ing) => ing.food_id);
    const result = await fetchFoodIngredients(ids);
    return result;
  };

  const [foodIngredients, setFoodIngredients] = useState<FoodGroup | null>(
    null
  );

  useEffect(() => {
    const getFoods = async () => {
      const foods = await fetchFoods(food.ingredients);
      setFoodIngredients(foods);
    };
    food.ingredients.length > 0 && getFoods();
  }, [food]);

  return (
    <PremiumLayout>
      {food && (
        <section className="flex w-full select-none flex-col gap-14 pb-24 pt-4">
          <div className="flex max-w-lg flex-col gap-10 ">
            <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex w-screen items-center gap-10 border-b px-4 py-2 backdrop-blur-lg">
              <BackButton />
              <span className="text-3xl font-semibold">{food.food_name}</span>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-start justify-start gap-10 p-4 sm:px-10">
            <div className="flex flex-col gap-10">
              <div className="flex w-full max-w-xl flex-col gap-5">
                <Image
                  src={food.image}
                  alt={`${food.food_name}`}
                  width={250}
                  height={250}
                  className="w-50 pt-[var(--nav-h) m-auto mb-5 rounded-lg"
                />
                {food.food_id && <FoodActions foodID={food.food_id} />}
              </div>
              <div className="flex w-full max-w-xl">
                <FoodNutrition isIngredient={false} foodProp={food} />
              </div>
            </div>
            <div className="flex w-full max-w-xl flex-col gap-5">
              {foodIngredients && food.ingredients.length > 0 && (
                <div className="w-full max-w-xl">
                  <Ingredients
                    foodIngredients={foodIngredients}
                    ingredients={food.ingredients}
                  />
                </div>
              )}
              {food.instructions.length > 0 && (
                <div className="w-full max-w-xl">
                  <Instructions instructions={food.instructions} />
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
