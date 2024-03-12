import SearchLayout from "@/layouts/SearchLayout";
import { FilterQueries } from "@/types";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const queries: FilterQueries = {};

  Object.entries(router?.query).forEach((query) => {
    if (query) {
      queries[query[0] as keyof FilterQueries] = String(query[1]);
    }
  });

  return <SearchLayout queries={queries}>{}</SearchLayout>;
}
