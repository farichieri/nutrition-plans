import {
  AddProgress,
  Graphic,
  WeightGoal,
  ProgressList,
} from "@/features/progress";
import PremiumLayout from "@/layouts/PremiumLayout";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-5 px-4 py-10">
        <Graphic />
        <ProgressList />
        <AddProgress />
        <WeightGoal />
      </section>
    </PremiumLayout>
  );
}
