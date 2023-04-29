import { FoodGroup } from "@/types/foodTypes";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import BackButton from "@/components/Back/BackButton";
import FoodNutritionDetail from "@/components/Premium/Food/FoodNutritionDetail";
import Image from "next/image";
import Link from "next/link";
import PieGraph from "@/components/PieGraph/PieGraph";
import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const food = foodsSearched[id as keyof FoodGroup];
  const nutrients = food.nutrients;
  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = (event: React.MouseEvent) => {
    event?.preventDefault();
    setOpenDetails(true);
  };
  const handleClose = () => {
    setOpenDetails(false);
  };

  return (
    <PremiumLayout>
      {openDetails && (
        <FoodNutritionDetail food={food} handleClose={handleClose} />
      )}
      {food && (
        <section className="flex max-w-lg flex-col gap-10 px-4 pb-24 pt-4 sm:px-10">
          <div className="flex items-center gap-10">
            <BackButton />
            <h1>{food.food_name}</h1>
          </div>
          <Image
            src={food.image}
            alt={`${food.food_name}`}
            width={200}
            height={200}
            className="w-50 m-auto rounded-lg "
          />
          <div className="flex  flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">Nutrition Values</span>
              {food.source && (
                <div className="flex items-center gap-1">
                  <span>Source:</span>
                  <Link
                    href={"https://www.usda.gov/"}
                    target="_blank"
                    className="text-green-500 opacity-50 duration-300 hover:opacity-100"
                  >
                    {food.source}
                  </Link>
                </div>
              )}
            </div>
            <PieGraph
              calories={nutrients.calories}
              carbohydrates={nutrients.carbohydrates}
              fats={nutrients.fats}
              proteins={nutrients.proteins}
            />
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <span>Calories:</span>
                <span>{nutrients.calories}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Carbs:</span>
                <span>{nutrients.carbohydrates}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Fats:</span>
                <span>{nutrients.fats}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Proteins:</span>
                <span>{nutrients.proteins}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <span>Fiber:</span>
                <span>{nutrients.fiber || "-"}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Net carbs:</span>
                <span>
                  {Number(nutrients.carbohydrates) - Number(nutrients.fiber)}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex w-full justify-between">
                <span>Sodium:</span>
                <span>{nutrients.sodium || "-"}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Cholesterol:</span>
                <span>{nutrients.cholesterol || "-"}</span>
              </div>
            </div>
            <button
              className="m-auto w-fit rounded-3xl border px-4 py-2"
              onClick={handleOpenDetails}
            >
              Detailed Nutrition
            </button>
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
