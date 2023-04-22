import BMRCalculator from "@/components/Premium/Calculator/BodyFeatures";
import EvolutionNav from "@/components/Premium/EvolutionNav/EvolutionNav";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import WeightGoal from "@/components/Premium/Progress/WeightGoal/WeightGoal";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <EvolutionNav />
      <section className="flex flex-col items-center gap-2 px-4 pb-10 pt-20">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex w-full flex-wrap justify-center gap-24">
          <div>
            <BMRCalculator handleSubmit={handleSubmit} />
          </div>
          <div>
            <FoodPreferences handleSubmit={handleSubmit} />
          </div>
          <div>
            <WeightGoal />
          </div>
        </div>
      </section>
    </PremiumLayout>
  );
}
