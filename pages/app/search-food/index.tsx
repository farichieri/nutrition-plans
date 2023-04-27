import PremiumLayout from "@/components/Layout/PremiumLayout";
import FoodSearch from "@/components/Premium/Food/FoodSearch";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="px-4 pb-24 pt-4 sm:px-10">
        <FoodSearch />
      </section>
    </PremiumLayout>
  );
}
