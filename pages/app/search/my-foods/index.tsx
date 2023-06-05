import { FilterQueries } from "@/types";
import { GetServerSideProps } from "next";
import SearchLayout from "@/layouts/SearchLayout";

interface Props {
  queries: FilterQueries;
}

export default function Page({ queries }: Props) {
  return <SearchLayout queries={queries}>{}</SearchLayout>;
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
