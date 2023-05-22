import { fetchFoods } from "@/firebase/helpers/Food";
import { FilterQueries } from "@/types/types";
import { FoodGroup } from "@/types/foodTypes";
import { selectFoodsSlice, setFoodsSearched } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  queries: FilterQueries;
}

const SearchBar: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const [searchInput, setSearchInput] = useState<string>(queries.q || "");
  const [isSearching, setIsSearching] = useState(false);
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
  };

  useEffect(() => {
    if (noData) {
      fetchData("");
    }
    const timer = setTimeout(() => {
      if (searchInput) {
        router.replace({
          pathname: router.pathname,
          query: {
            ...queries,
            q: searchInput,
          },
        });
      } else {
        if (searchInput !== queries.q) {
          delete queries.q;
          router.replace({
            query: {
              ...queries,
            },
            pathname: router.pathname,
          });
        }
      }
      fetchData(searchInput.toLowerCase());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
  };

  return (
    <form
      action=""
      className="relative mx-auto flex h-10 w-fit items-center gap-2 overflow-auto rounded-3xl border bg-slate-400/20 pl-4 shadow-sm focus-within:border-[darkgray] dark:bg-slate-500/10 dark:focus-within:border-white"
    >
      <span className="material-icons md-18">search</span>
      <input
        onChange={handleChange}
        value={searchInput}
        type="text"
        placeholder="Search"
        className=" w-full bg-transparent px-2 outline-none"
      />
      {searchInput && (
        <span
          className="material-icons md-18 absolute right-2 cursor-pointer"
          onClick={() => setSearchInput("")}
        >
          close
        </span>
      )}
      <div className="absolute right-10">
        {isSearching && <Spinner customClass="h-4 w-4" />}
      </div>
    </form>
  );
};

export default SearchBar;