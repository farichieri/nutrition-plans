import {
  fetchFoods,
  setFoodsSearched,
  setIsSearchingFoods,
  setMyFoodsSearched,
} from "@/features/foods";
import { FC, useEffect, useState } from "react";
import { AppRoutes } from "@/utils/routes";
import { FilterQueries } from "@/types";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import RoundButton from "@/components/Buttons/RoundButton";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  queries: FilterQueries;
}

const SearchBar: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [searchInput, setSearchInput] = useState<string>(queries.q || "");
  const [isSearching, setIsSearching] = useState(false);

  const fetchMyFoods = async (input: string) => {
    const myFoodsRes = await fetchFoods({
      food_name_lowercase: input,
      kind: undefined,
      uploader_id: user?.user_id,
    });
    if (myFoodsRes.result === "success") {
      dispatch(setMyFoodsSearched(myFoodsRes.data));
    } else {
      dispatch(setMyFoodsSearched({}));
    }
  };

  const fetchAllDBFoods = async (input: string) => {
    const myFoodsRes = await fetchFoods({
      food_name_lowercase: input,
      kind: undefined,
    });
    if (myFoodsRes.result === "success") {
      dispatch(setFoodsSearched(myFoodsRes.data));
    }
  };

  const fetchData = async (input: string) => {
    setIsSearching(true);
    dispatch(setIsSearchingFoods(true));
    if (router.pathname === AppRoutes.search_my_foods) {
      await fetchMyFoods(input);
    } else {
      await fetchAllDBFoods(input);
      await fetchMyFoods(input);
    }
    setIsSearching(false);
    dispatch(setIsSearchingFoods(false));
  };

  useEffect(() => {
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
        if (queries.q && searchInput !== queries.q) {
          delete queries.q;
          router.replace({
            query: {
              ...queries,
            },
            pathname: router.pathname,
          });
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchData((queries.q || "").toLocaleLowerCase());
  }, [queries.q]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
  };

  return (
    <form
      action=""
      className="relative mx-auto flex h-10 w-full max-w-md items-center gap-2 overflow-auto rounded-3xl border bg-slate-400/20 pl-4 shadow-sm focus-within:border-[darkgray] dark:bg-slate-500/10 dark:focus-within:border-white"
    >
      <span className="material-icons md-18">search</span>
      <input
        onChange={handleChange}
        value={searchInput}
        type="text"
        placeholder="Search"
        className="w-full bg-transparent px-2 outline-none"
      />
      {searchInput && (
        <RoundButton
          onClick={() => setSearchInput("")}
          customClass="p-1 flex items-center justify-center  absolute right-2 "
        >
          <span className="material-icons md-18 ">close</span>
        </RoundButton>
      )}
      <div className="absolute right-10">
        {isSearching && <Spinner customClass="h-4 w-4" />}
      </div>
    </form>
  );
};

export default SearchBar;
