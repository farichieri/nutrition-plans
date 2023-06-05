import {
  AddProgress,
  Graphic,
  WeightGoal,
  ProgressList,
} from "@/features/progress";
import PremiumLayout from "@/layouts/PremiumLayout";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <SubPremiumNav title="Progress" customClass="top-[var(--subnav-h)]" />
      <section className="m-auto mt-[var(--subnav-h)] flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-10">
        <Graphic />
        <ProgressList />
        <AddProgress />
        <WeightGoal />
      </section>
    </PremiumLayout>
  );
}
