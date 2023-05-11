import FoodCreate from "@/components/Premium/Food/FoodCreate";
import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="gap-10 rounded-lg bg-white p-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[1vw] sm:px-10">
        <FoodCreate />
      </section>
    </PremiumLayout>
  );
}
