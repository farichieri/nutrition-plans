import PremiumLayout from "@/components/Layout/PremiumLayout";
import BMRCalculator from "@/components/Premium/Calculator/BMRCalculator";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";
import Goal from "@/components/Premium/Calculator/Goal";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-10 p-4">
        <h1 className="text-3xl font-bold">Calculate your ideal plan</h1>
        <BMRCalculator />
        <FoodPreferences />
        <Goal />
      </section>
    </PremiumLayout>
  );
}
