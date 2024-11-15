import { AppRoutes } from "@/utils/routes";
import { FC } from "react";
import { FilterQueries } from "@/types";
import { Options, Option } from "@/components";
import { useRouter } from "next/router";

interface Props {
  queries: FilterQueries;
}

const DatabaseSelector: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const allDatabaseRoute = AppRoutes.search_foods;
  const myCreationsRoute = AppRoutes.search_my_creations;
  const isAllDatabase = router.route === allDatabaseRoute;
  const isMyCreations = router.route === myCreationsRoute;

  const getQueries = () => {
    const queryEntries = Object.entries(router.query);
    if (queryEntries.length === 0) {
      return "";
    } else {
      return `?${Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`;
    }
  };

  return (
    <div id="tour-search-3" className="flex gap-10 px-2 sm:px-0">
      <div className="flex w-full items-center justify-start gap-5 sm:gap-10">
        <Options>
          <Option
            position="left"
            selected={isAllDatabase}
            isLink
            href={`${allDatabaseRoute}${getQueries()}`}
          >
            All
          </Option>
          <Option
            position="right"
            selected={isMyCreations}
            isLink
            href={`${myCreationsRoute}${getQueries()}`}
          >
            Creations
          </Option>
        </Options>
      </div>
    </div>
  );
};

export default DatabaseSelector;
