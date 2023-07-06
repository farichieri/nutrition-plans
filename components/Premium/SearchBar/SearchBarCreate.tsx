import {
  fetchFoods,
  selectFoodsSlice,
  setFoodsSearched,
} from "@/features/foods";
import { MdSearch } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, useCallback, useEffect, useState } from "react";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  onFocus?: Function;
  preFetch: boolean;
}

const SearchBarCreate: FC<Props> = ({ onFocus, preFetch }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const noData = Object.values(foodsSearched).length === 0;

  const fetchData = useCallback(
    async (input: string) => {
      if (!user?.id) return;
      setIsSearching(true);
      const res = await fetchFoods({
        queries: { q: input },
        uploaderID: user?.id,
      });
      if (res.result === "success") {
        dispatch(setFoodsSearched({ foods: res.data, userID: user.id }));
      } else {
        dispatch(setFoodsSearched({ foods: {}, userID: user.id }));
      }
      setIsSearching(false);
    },
    [dispatch, user?.id]
  );

  useEffect(() => {
    if (preFetch || (isFocused && noData) || (!preFetch && isFocused)) {
      if (noData) {
        fetchData("");
      }

      const timer = setTimeout(() => {
        fetchData(searchInput.toLowerCase());
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [searchInput, isFocused, fetchData, preFetch]);

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
    <div className="flex w-full flex-wrap items-center gap-10 p-4">
      <form
        action=""
        className="relative flex h-10 w-fit items-center gap-2 overflow-auto rounded-3xl border bg-slate-400/20 pl-4 shadow-sm focus-within:border-[darkgray] dark:bg-slate-500/10 dark:focus-within:border-white"
      >
        <MdSearch className="h-6 w-6 text-slate-400" />
        <input
          onChange={handleChange}
          value={searchInput}
          type="text"
          placeholder="Search Food"
          className=" w-full bg-transparent px-2 outline-none"
          onFocus={handleFocus}
          autoFocus
        />
        <div className="absolute right-5">
          {isSearching && <Spinner customClass="h-4 w-4" />}
        </div>
      </form>
    </div>
  );
};

export default SearchBarCreate;
