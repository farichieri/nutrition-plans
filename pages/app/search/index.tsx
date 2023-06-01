import { FilterQueries } from "@/types";
import { FoodsSearched } from "@/features/foods";
import { GetServerSideProps } from "next";
import Filters from "@/components/Premium/SearchBar/Filters";
import PremiumLayout from "@/layouts/PremiumLayout";
import SearchBar from "@/components/Premium/SearchBar/SearchBar";

interface Props {
  queries: FilterQueries;
}

export default function Page({ queries }: Props) {
  return (
    <PremiumLayout>
      <section className="m-auto flex w-full max-w-screen-xl flex-col justify-center gap-5 px-4 pb-24 pt-4 sm:px-10">
        <SearchBar queries={queries} />
        <Filters queries={queries} />
        <FoodsSearched queries={queries} />
      </section>
    </PremiumLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries: FilterQueries = {};

  Object.entries(context?.query).forEach((query) => {
    if (query) {
      queries[query[0] as keyof FilterQueries] = String(query[1]);
    }
  });

  return { props: { queries } };
};
