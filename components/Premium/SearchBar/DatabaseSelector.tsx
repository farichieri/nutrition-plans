import { AppRoutes } from "@/utils/routes";
import { FC } from "react";
import { FilterQueries } from "@/types";
import { useRouter } from "next/router";

const fixedButtonClass =
  "relative after:absolute border-b border-b text-sm sm:text-lg after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";
const selectedClass = "after:origin-bottom-left after:scale-x-100";

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
    <div className="flex gap-10">
      <div className="flex w-full items-center justify-start gap-5 sm:gap-10">
        <button
          onClick={handleSelect}
          className={fixedButtonClass + (isAllDatabase ? selectedClass : "")}
        >
          All Database
        </button>
        <button
          onClick={handleSelect}
          className={fixedButtonClass + (isMyCreations ? selectedClass : "")}
        >
          My Creations
        </button>
      </div>
    </div>
  );
};

export default DatabaseSelector;
