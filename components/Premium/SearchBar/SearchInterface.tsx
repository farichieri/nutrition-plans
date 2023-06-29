import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Configure,
  Pagination,
} from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import FoodCard from "@/features/foods/components/search-food/FoodsSearched/FoodCard";
import Filters from "./Filters";
import { FilterQueries } from "@/types";
import { searchClient } from "@/lib/typesense";

const SearchInterface = ({ queries }: { queries: FilterQueries }) => {
  const Hit = ({ hit }: { hit: any }) => {
    return <FoodCard food={hit} />;
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="foods">
      <SearchBox className="" autoFocus />
      <Configure hitsPerPage={40} />
      <Filters
        queries={queries}
        updateRoute={true}
        setLocalQueries={() => {}}
      />
      {/* <Stats /> */}
      <Hits hitComponent={Hit} />
      {/* <Pagination /> */}
    </InstantSearch>
  );
};

export default SearchInterface;
