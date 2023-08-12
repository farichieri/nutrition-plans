import {
  AddProgress,
  DaysLeft,
  Graphic,
  ProgressList,
} from "@/features/progress";
import { PremiumSidebar } from "@/layouts";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={true} title="Progress" />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-5 px-2 pb-2 pt-2 sm:px-5 sm:pt-4">
        <div className="flex w-full flex-wrap justify-center gap-5">
          <Graphic />
          <ProgressList />
        </div>
        <AddProgress />
        <DaysLeft />
      </section>
    </PremiumLayout>
  );
}
