import { FilterQueries } from "@/types";
import { FoodsSearched } from "@/features/foods";
import DatabaseSelector from "@/components/Premium/SearchBar/DatabaseSelector";
import Filters from "@/components/Premium/SearchBar/Filters";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import SearchBar from "@/components/Premium/SearchBar/SearchBar";
import CreateButton from "@/features/foods/components/common/CreateButton";

interface Props {
  queries: FilterQueries;
  children: React.ReactNode;
}

export default function SearchLayout({ queries }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false}>
        <SearchBar queries={queries} />
      </PremiumNav>
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-4 pb-24 pt-4 sm:px-5">
        <div className="flex items-center gap-10">
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
