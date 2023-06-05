import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FilterQueries } from "@/types";

const fixedButtonClass =
  "relative after:absolute border-b border-b text-sm sm:text-lg after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";
const selectedClass = "after:origin-bottom-left after:scale-x-100";

interface Props {
  queries: FilterQueries;
}

const DatabaseSelector: FC<Props> = ({ queries }) => {
  const router = useRouter();
  console.log({ router });
  const allDatabaseRoute = "/app/search";
  const myFoodsRoute = "/app/search/my-foods";
  const isAllDatabase = router.route === allDatabaseRoute;
  const isMyFoods = router.route === myFoodsRoute;

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const path = isAllDatabase ? myFoodsRoute : allDatabaseRoute;

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
          className={fixedButtonClass + (isMyFoods ? selectedClass : "")}
        >
          My Foods
        </button>
      </div>
    </div>
  );
};

export default DatabaseSelector;
