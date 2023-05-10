import RecipeCreate from "@/components/Premium/Recipe/CreateRecipe/RecipeCreate";
import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="gap-10 rounded-lg bg-white p-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-4 sm:px-10">
        <RecipeCreate />
      </section>
    </PremiumLayout>
  );
}
