import { fetchFoods } from "@/firebase/helpers/Food";
import { FoodGroup } from "@/types/foodTypes";
import {
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { selectFoodsSlice, setFoodsSearched } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect, useState } from "react";

interface Props {}

const SearchBar: FC<Props> = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState<string>("");
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const noData = Object.values(foodsSearched).length === 0;
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    if (noData) {
      fetchData("");
    }
  }, []);

  const fetchData = async (input: string) => {
    const res: FoodGroup = await fetchFoods(input);
    if (!res?.error) {
      !res.error && dispatch(setFoodsSearched(res));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchData(searchInput.toLowerCase());
  };

  const handleOpenFilters = async (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenFilters(!openFilters);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-10">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex h-10 w-fit items-center gap-2 overflow-auto rounded-3xl border bg-slate-400/20 pl-4 shadow-sm focus-within:border-[darkgray] dark:bg-slate-500/10 dark:focus-within:border-white"
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          onChange={handleChange}
          value={searchInput}
          type="text"
          placeholder="Search Food"
          className=" w-full bg-transparent px-2 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="flex h-full items-center rounded-r-3xl border-l pl-3 pr-4 font-semibold active:bg-slate-500/20 dark:border-slate-500/50 dark:shadow-slate-500/50"
        >
          Search
        </button>
      </form>
      <button onClick={handleOpenFilters} className="flex items-center gap-2">
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
        Filters
      </button>
      {openFilters && (
        <div className="flex flex-wrap gap-5">
          <div>By Plan/Diet</div>
          <div>By Calories min/max </div>
          <div>By Macros min/max</div>
          <div>By Food or Recipe ? or there will be a Recipe Searcher</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
