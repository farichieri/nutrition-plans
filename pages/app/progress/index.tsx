import {
  AddProgress,
  Graphic,
  WeightGoal,
  ProgressList,
} from "@/features/progress";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="progress" />
      <section className="m-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-5">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5">
          <Graphic />
          <ProgressList />
          {/* <WeightGoal /> */}
        </div>
        <AddProgress />
      </section>
    </PremiumLayout>
  );
}
