import BMRCalculator from "@/components/Premium/Calculator/BodyFeatures";
import EvolutionNav from "@/components/Premium/EvolutionNav/EvolutionNav";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";
import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <EvolutionNav />
      <section className="flex flex-col items-center gap-2 px-4 py-4">
        <h1 className="mb-10 text-3xl font-bold">Profile</h1>
        <BMRCalculator handleSubmit={handleSubmit} />
        <FoodPreferences handleSubmit={handleSubmit} />
      </section>
    </PremiumLayout>
  );
}
