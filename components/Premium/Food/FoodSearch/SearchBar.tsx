import { fetchFoods } from "@/firebase/helpers/Food";
import { FoodGroup } from "@/types/foodTypes";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { setFoodsSearched } from "@/store/slices/foodsSlice";
import { useDispatch } from "react-redux";
import React, { FC, useEffect, useState } from "react";

interface Props {}

const SearchBar: FC<Props> = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {}, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res: FoodGroup = await fetchFoods(searchInput);
    if (!res?.error) {
      !res.error && dispatch(setFoodsSearched(res));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex w-fit items-center gap-2 overflow-auto rounded-3xl bg-slate-400/50 py-0.5 pl-4 dark:bg-slate-500/50"
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          onChange={handleChange}
          value={searchInput}
          type="text"
          placeholder="Search Food"
          className=" w-full bg-transparent p-2 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="rounded-r-3xl border-l py-2 pl-3 pr-4 font-semibold active:shadow-inner dark:border-slate-500 dark:shadow-slate-500/50"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
