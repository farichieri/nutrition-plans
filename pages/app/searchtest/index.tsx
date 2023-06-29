import { FilterQueries } from "@/types";
import { GetServerSideProps } from "next";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SearchInterface from "@/components/Premium/SearchBar/SearchInterface";

export default function Page({ queries }: { queries: FilterQueries }) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-4 pb-24 pt-4 sm:px-5">
        <SearchInterface queries={queries} />
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
