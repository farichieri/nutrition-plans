import { FilterQueries } from "@/types";
import { FoodsSearched } from "@/features/foods";
import DatabaseSelector from "@/components/Premium/SearchBar/DatabaseSelector";
import Filters from "@/components/Premium/SearchBar/Filters";
import PremiumLayout from "@/layouts/PremiumLayout";
import SearchBar from "@/components/Premium/SearchBar/SearchBar";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

interface Props {
  queries: FilterQueries;
  children: React.ReactNode;
}

export default function SearchLayout({ queries }: Props) {
  return (
    <PremiumLayout>
      <SubPremiumNav
        title=""
        customClass="top-[var(--subnav-h)] border-[#1d1d1d;] h-14"
      >
        <SearchBar queries={queries} />
      </SubPremiumNav>
      <section className="m-auto mt-[var(--subnav-h)] flex w-full max-w-screen-xl flex-col justify-center gap-5 px-4 pb-24 pt-4 sm:px-10">
        <DatabaseSelector queries={queries} />
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
