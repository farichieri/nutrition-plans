import PremiumLayout from "@/components/Layout/PremiumLayout";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { FoodGroup } from "@/types/foodTypes";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const food = foodsSearched[id as keyof FoodGroup];

  console.log({ id });
  return (
    <PremiumLayout>
      <section className="flex flex-col gap-10 px-4 pb-24 pt-4 sm:px-10">
        <h1>{food.food_name}</h1>
      </section>
    </PremiumLayout>
  );
}
