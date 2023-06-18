import { Goal } from "@/features/authentication";
import PremiumLayout from "@/layouts/PremiumLayout";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  const handleContinue = () => {};
  return (
    <PremiumLayout>
      <SubPremiumNav
        title="Body Features"
        customClass="top-[var(--subnav-h)]"
      />
      <section className="m-auto mt-[var(--subnav-h)] flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 py-10">
          <Goal handleContinue={handleContinue} />
        </div>
      </section>
    </PremiumLayout>
  );
}
