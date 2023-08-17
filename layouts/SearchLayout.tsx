import { FilterQueries } from "@/types";
import { FoodsSearched } from "@/features/foods";
import { PremiumSidebar } from "@/layouts";
import CreateButton from "@/features/foods/components/common/CreateButton";
import DatabaseSelector from "@/components/Premium/SearchBar/DatabaseSelector";
import Filters from "@/components/Premium/SearchBar/Filters";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import SearchBar from "@/components/Premium/SearchBar/SearchBar";

interface Props {
  queries: FilterQueries;
  children: React.ReactNode;
}

export default function SearchLayout({ queries }: Props) {
  const isMobile = window.innerWidth < 1024;
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
          updateRoute={true}
          setLocalQueries={() => {}}
        />
        <FoodsSearched queries={queries} />
      </section>
    </PremiumLayout>
  );
}
