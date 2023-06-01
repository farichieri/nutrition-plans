import {
  fetchFoods,
  FoodGroup,
  selectFoodsSlice,
  setFoodsSearched,
} from "@/features/foods";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect, useState } from "react";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  onFocus?: Function;
  preFetch: boolean;
}

const SearchBarCreate: FC<Props> = ({ onFocus, preFetch }) => {
  const dispatch = useDispatch();
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const noData = Object.values(foodsSearched).length === 0;

  const fetchData = async (input: string) => {
    setIsSearching(true);
    const res: FoodGroup = await fetchFoods({
      food_name_lowercase: input,
      kind: undefined,
    });
    if (!res?.error) {
      !res.error && dispatch(setFoodsSearched(res));
    }
    setIsSearching(false);
    setIsFocused(false);
  };

  useEffect(() => {
    if (preFetch || (isFocused && noData) || (!preFetch && isFocused)) {
      if (noData) {
        fetchData("");
      }

      const timer = setTimeout(() => {
        fetchData(searchInput.toLowerCase());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchInput, isFocused]);

  const handleOpenFilters = async (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenFilters(!openFilters);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
    setIsFocused(true);
  };

  const handleFocus = (event: React.FocusEvent) => {
    event.preventDefault();
    onFocus && onFocus();
    setIsFocused(true);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-10">
      <form
        action=""
        className="relative flex h-10 w-fit items-center gap-2 overflow-auto rounded-3xl border bg-slate-400/20 pl-4 shadow-sm focus-within:border-[darkgray] dark:bg-slate-500/10 dark:focus-within:border-white"
      >
        <span className="material-icons md-18">search</span>
        <input
          onChange={handleChange}
          value={searchInput}
          type="text"
          placeholder="Search Food"
          className=" w-full bg-transparent px-2 outline-none"
          onFocus={handleFocus}
        />
        <div className="absolute right-5">
          {isSearching && <Spinner customClass="h-4 w-4" />}
        </div>
      </form>
      <button onClick={handleOpenFilters} className="flex items-center gap-2">
        <span className="material-icons-outlined">tune</span> Filters
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

export default SearchBarCreate;
