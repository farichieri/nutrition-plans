import RecipeCreate from "@/components/Premium/Recipe/RecipeCreate";
import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="px-4 pb-24 pt-4 sm:px-10">
        <RecipeCreate />
      </section>
    </PremiumLayout>
  );
}
