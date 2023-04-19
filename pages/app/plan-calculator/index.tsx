import PremiumLayout from "@/components/Layout/PremiumLayout";
import BMRCalculator from "@/components/Premium/Calculator/BMRCalculator";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-2 px-4 py-14">
        <h1 className="mb-10 text-3xl font-bold">Calculate your ideal plan</h1>
        <BMRCalculator />
        <FoodPreferences />
      </section>
    </PremiumLayout>
  );
}
