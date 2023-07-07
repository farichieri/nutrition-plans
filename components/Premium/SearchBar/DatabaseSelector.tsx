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
  console.log({ router });
  const allDatabaseRoute = AppRoutes.search_foods;
  const myCreationsRoute = AppRoutes.search_my_creations;
  const isAllDatabase = router.route === allDatabaseRoute;
  const isMyCreations = router.route === myCreationsRoute;

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const path = isAllDatabase ? myCreationsRoute : allDatabaseRoute;

    let query = { ...queries };
    router.replace({
      pathname: path,
      query,
    });
  };

  return (
    <div className="flex gap-10 px-2 sm:px-0">
      <div className="flex w-full items-center justify-start gap-5 sm:gap-10">
        <Options>
          <Option
            position="left"
            onClick={handleSelect}
            selected={isAllDatabase}
          >
            All Foods
          </Option>

          <Option
            position="right"
            onClick={handleSelect}
            selected={isMyCreations}
          >
            My Creations
          </Option>
        </Options>
      </div>
    </div>
  );
};

export default DatabaseSelector;
