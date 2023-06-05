import { FoodCreate } from "@/features/foods";
import PremiumLayout from "@/layouts/PremiumLayout";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <SubPremiumNav title="Create Food" customClass="top-[var(--subnav-h)]" />
      <section className="lex-col m-auto mt-[var(--subnav-h)] flex w-full items-start justify-start gap-5 px-4 pb-4 pt-4 sm:px-8">
        <FoodCreate />
      </section>
    </PremiumLayout>
  );
}
