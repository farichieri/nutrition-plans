import { GetServerSideProps } from "next";
import FoodsSearched from "@/components/Premium/Food/FoodSearch/FoodsSearched";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import SearchBar from "@/components/Premium/SearchBar/SearchBar";

interface Props {
  q: string;
}

export default function Page({ q }: Props) {
  return (
    <PremiumLayout>
      <section className="flex flex-col gap-10 px-4 pb-24 pt-4 sm:px-10">
        <SearchBar q={String(q)} />
        <FoodsSearched />
      </section>
    </PremiumLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = context?.query?.q ?? "";

  return { props: { q: q } };
};
