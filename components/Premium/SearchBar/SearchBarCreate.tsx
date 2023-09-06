import {
  selectFoodsSlice,
  useGetFoodsByIdsMutation,
  useGetFoodsMutation,
} from "@/features/foods";
import { FilterQueries } from "@/types";
import { MdClose, MdFavorite, MdSearch } from "react-icons/md";
import { RoundButton } from "@/components/Buttons";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, useCallback, useEffect, useState } from "react";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  onFocus?: Function;
  preFetch: boolean;
  queries: FilterQueries;
}

const SearchBarCreate: FC<Props> = ({ onFocus, preFetch, queries }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const noData = Object.values(foodsSearched).length === 0;
  const [getFoods, { isLoading: isSearchingAll }] = useGetFoodsMutation();
  const [getFoodsByIDS, { isLoading: isSearchingFavorites }] =
    useGetFoodsByIdsMutation();

  const fetchData = useCallback(
    async (input: string) => {
      if (!user?.id) return;
      await getFoods({
        queries: { ...queries, q: input },
        uploaderID: user?.id,
        user,
      });
      setIsFavorites(false);
    },
    [dispatch, user?.id, queries, searchInput]
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

  const handleFavorites = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    try {
      setSearchInput("");

      if (!isFavorites) {
        const userFavorites = user.ratings.foodsRating.favorites;
        getFoodsByIDS({ ids: userFavorites, user });
        setIsFavorites(true);
      } else {
        fetchData("");
        setIsFavorites(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2 p-4">
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
          {isSearchingAll && <Spinner customClass="h-4 w-4" />}
        </div>
      </form>
      <RoundButton
        onClick={handleFavorites}
        customClass={`px-3 py-1.5 !border-slate-500/20 ${
          isFavorites && "!border-slate-500/50 !bg-slate-500/20"
        }`}
      >
        <MdFavorite
          className={`pointer-events-none mr-1 h-6 w-6 ${
            isFavorites && "text-green-500"
          }`}
        />
        Favorites
        {isSearchingFavorites && <Spinner customClass="h-4 w-4 ml-2" />}
        {isFavorites && <MdClose className="ml-2 h-4 w-4" />}
      </RoundButton>
    </div>
  );
};

export default SearchBarCreate;
