import { RecipeCreate } from "@/features/foods";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="create recipe" />
      <section className="lex-col m-auto flex w-full items-start justify-start gap-5 px-4 pb-4 pt-4 sm:px-8">
        <RecipeCreate />
      </section>
    </PremiumLayout>
  );
}
