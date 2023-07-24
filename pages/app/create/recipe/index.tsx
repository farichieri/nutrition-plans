import { BackButton } from "@/components/Buttons";
import { RecipeCreate } from "@/features/foods";
import { PremiumSidebar } from "@/layouts";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="" />
      <PremiumSidebar />

      <SubPremiumNav>
        <div className="flex items-center gap-2 px-2">
          <BackButton />
          <span className="text-xl font-bold">Create Recipe</span>
        </div>
      </SubPremiumNav>
      <section className="m-auto mt-[var(--nav-h)] flex w-full flex-col items-start justify-start gap-5 px-4 pb-4 pt-4 sm:px-8">
        <RecipeCreate />
      </section>
    </PremiumLayout>
  );
}
