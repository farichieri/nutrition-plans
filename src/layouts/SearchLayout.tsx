import Pagination from "@/components/Pagination/Pagination";
import DatabaseSelector from "@/components/Premium/SearchBar/DatabaseSelector";
import Filters from "@/components/Premium/SearchBar/Filters";
import SearchBar from "@/components/Premium/SearchBar/SearchBar";
import { FoodsSearched, selectFoodsSlice } from "@/features/foods";
import CreateButton from "@/features/foods/components/common/CreateButton";
import { PremiumSidebar } from "@/layouts";
import PremiumLayout from "@/layouts/PremiumLayout";
import { FilterQueries } from "@/types";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import PremiumNav from "./components/Nav/PremiumNav";

interface Props {
  queries: FilterQueries;
  children: React.ReactNode;
}

function SearchLayout({ queries }: Props) {
  const isMobile = window.innerWidth < 1024;
  const { pages } = useSelector(selectFoodsSlice);
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="">
        <SearchBar queries={queries} />
      </PremiumNav>
      <PremiumSidebar hideScrolling={isMobile} />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <div className="flex items-center justify-between gap-10">
          <DatabaseSelector queries={queries} />
          <CreateButton />
        </div>
        <Filters
          queries={queries}
          setLocalQueries={() => {}}
          updateRoute={true}
        />
        <FoodsSearched queries={queries} />
        <Pagination
          pages={pages}
          queries={queries}
          setLocalQueries={() => {}}
          updateRoute={true}
        />
      </section>
    </PremiumLayout>
  );
}

export default dynamic(() => Promise.resolve(SearchLayout), { ssr: false });
