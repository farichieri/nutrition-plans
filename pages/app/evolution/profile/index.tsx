import BMRCalculator from "@/components/Premium/Calculator/BodyFeatures";
import EvolutionNav from "@/components/Premium/EvolutionNav/EvolutionNav";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import WeightGoal from "@/components/Premium/Progress/WeightGoal/WeightGoal";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-10 px-4 py-10">
        <div className="w-full border-b pb-10">
          <h1 className="mx-auto w-full max-w-5xl text-3xl font-semibold">
            Profile
          </h1>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-10">
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
