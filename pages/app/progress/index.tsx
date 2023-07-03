import { AddProgress, Graphic, ProgressList } from "@/features/progress";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={true} title="" />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-5 px-2 pb-4 pt-4 sm:px-5">
        <div className="flex w-full flex-wrap justify-center gap-5">
          <Graphic />
          <ProgressList />
        </div>
        <AddProgress />
      </section>
    </PremiumLayout>
  );
}
