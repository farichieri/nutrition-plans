import {
  fetchFoods,
  setFoodsSearched,
  setIsSearchingFoods,
} from "@/features/foods";
import { FC, useEffect, useState } from "react";
import { FilterQueries } from "@/types";
import { IoMdArrowBack } from "react-icons/io";
import { MdClose, MdSearch } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import RoundButton from "@/components/Buttons/RoundButton";
import Spinner from "@/components/Loader/Spinner";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {
  queries: FilterQueries;
}

const SearchBar: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [searchInput, setSearchInput] = useState<string>(queries.q || "");
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const windowWidth = useWindowWidth();

  const fetchData = async ({ queries }: { queries: FilterQueries }) => {
    if (!user?.user_id) return;
    setIsSearching(true);
    const res = await fetchFoods({
      queries: queries,
      uploader_id: user?.user_id,
    });
    if (res.result === "success") {
      dispatch(setFoodsSearched({ foods: res.data, user_id: user.user_id }));
    } else {
      dispatch(setFoodsSearched({ foods: {}, user_id: user.user_id }));
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
    fetchData({ queries });
  }, [queries]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
  };

  useEffect(() => {
    if (windowWidth > 768) {
      setShowSearchBar(true);
    }
  }, [windowWidth]);

  return (
    <>
      {showSearchBar ? (
        <div
          className={`${
            windowWidth > 768 ? "relative" : "fixed"
          } left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-primary-color px-4`}
        >
          <div className="mr-2 flex cursor-pointer items-center justify-center md:hidden ">
            <IoMdArrowBack
              onClick={(e) => {
                e.preventDefault();
                setShowSearchBar(false);
                setSearchInput("");
              }}
              className="text-2xl text-gray-400"
            />
          </div>
          <form
            action=""
            className="relative mx-auto flex h-9 w-full max-w-md items-center gap-2 overflow-auto rounded-3xl border bg-slate-400/20 pl-4 shadow-sm focus-within:border-[darkgray] dark:bg-slate-500/10 dark:focus-within:border-white"
          >
            <MdSearch className="text-2xl text-gray-400" />
            <input
              onChange={handleChange}
              value={searchInput}
              type="text"
              placeholder="Search"
              className="w-full bg-transparent px-2 outline-none"
              autoFocus
            />
            {searchInput && (
              <RoundButton
                onClick={() => setSearchInput("")}
                customClass="p-1 flex items-center justify-center  absolute right-2 "
              >
                <MdClose className="h-5 w-5 text-gray-400" />
              </RoundButton>
            )}
            <div className="absolute right-10">
              {isSearching && <Spinner customClass="h-4 w-4" />}
            </div>
          </form>
        </div>
      ) : (
        <button
          className="ml-auto flex h-10 w-10 cursor-pointer items-center justify-center"
          onClick={(e) => {
            e.preventDefault();
            setShowSearchBar(true);
          }}
        >
          <MdSearch className="text-2xl text-gray-400" />
        </button>
      )}
    </>
  );
};

export default SearchBar;
