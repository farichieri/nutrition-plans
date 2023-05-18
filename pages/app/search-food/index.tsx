import FoodsSearched from "@/components/Premium/Food/FoodSearch/FoodsSearched";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import SearchBar from "@/components/Premium/SearchBar/SearchBar";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="flex flex-col gap-10 px-4 pb-24 pt-4 sm:px-10">
        <SearchBar preFetch={true} />
        <FoodsSearched />
      </section>
    </PremiumLayout>
  );
}
