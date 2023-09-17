import { FilterQueries } from "@/types";
import { useRouter } from "next/router";
import SearchLayout from "@/layouts/SearchLayout";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const queries: FilterQueries = {};

  Object.entries(router?.query).forEach((query) => {
    if (query) {
      queries[query[0] as keyof FilterQueries] = String(query[1]);
    }
  });

  useEffect(() => {
    // Remove page query from url
    if (router.query.page) {
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router.pathname]);
  return <SearchLayout queries={queries}>{}</SearchLayout>;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queries: FilterQueries = {};
//   Object.entries(context?.query).forEach((query) => {
//     if (query) {
//       queries[query[0] as keyof FilterQueries] = String(query[1]);
//     }
//   });

//   return { props: { queries } };
// };
