import BMRCalculator from "@/components/Premium/Calculator/BodyFeatures";
import FoodPreferences from "@/components/Premium/Calculator/FoodPreferences";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import WeightGoal from "@/components/Premium/Progress/WeightGoal/WeightGoal";
import Results from "@/components/Premium/Calculator/Results";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-10 px-4 py-10">
        <div className="mb-5 w-full border-b pb-10">
          <h1 className="mx-auto w-full max-w-5xl text-3xl font-semibold">
            Profile
          </h1>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <BMRCalculator handleSubmit={handleSubmit} />
          <FoodPreferences handleSubmit={handleSubmit} />
          <Results handleSubmit={handleSubmit} />
          <WeightGoal />
        </div>
      </section>
    </PremiumLayout>
  );
}
