import Spinner from "@/components/Loader/Spinner";
import { fetchFoods } from "@/firebase/helpers/Food";
import {
  selectFoodsSlice,
  setBasicFoodsSearched,
} from "@/store/slices/foodsSlice";
import { FC, useEffect, useState } from "react";
import { filterObject } from "@/utils/filter";
import { Food, FoodGroup } from "@/types/foodTypes";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

interface Props {}
interface Props {}

const IngredientsSelector: FC<Props> = () => {
  const dispatch = useDispatch();
  const { basicFoodsSearched } = useSelector(selectFoodsSlice);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(basicFoodsSearched);
  const [isSearching, setIsSearching] = useState(false);
  const [openIngredients, setOpenIngredients] = useState(false);
  const [openIngredient, setOpenIngredient] = useState<Food | null>(null);

  const handleChangeSearcher = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchInput(value);
  };

  const fetchData = async (input: string) => {
    setIsSearching(true);
    const res: FoodGroup = await fetchFoods(input);
    if (!res?.error) {
      !res.error && dispatch(setBasicFoodsSearched(res));
    }
    setIsSearching(false);
  };

  useEffect(() => {
    setSearchResult(basicFoodsSearched);
  }, [basicFoodsSearched]);

  useEffect(() => {
    const foodsFiltered = filterObject(
      basicFoodsSearched,
      "food_name_lowercase",
      searchInput
    );
    setSearchResult(foodsFiltered);
    const timer = setTimeout(() => {
      fetchData(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleCloseIngredients = () => {
    setOpenIngredients(false);
    handleCloseIngredient();
  };

  const handleOpenIngredient = (ingredient: Food) => {
    setOpenIngredient(ingredient);
  };

  const handleCloseIngredient = () => {
    setOpenIngredient(null);
  };

  return (
    <div className="flex flex-col gap-2 rounded-md border p-2">
      <span className="text-3xl">Ingredients</span>
      <div className="flex items-center">
        <div className=" focus-within:border:gray-500 relative flex w-fit items-center gap-1 rounded-3xl border px-4 dark:focus-within:border-white">
          <span className="material-icons">search</span>
          <input
            placeholder="Add Ingredient"
            className="bg-transparent px-1 py-2 outline-none "
            value={searchInput}
            onChange={handleChangeSearcher}
            onFocus={() => setOpenIngredients(true)}
          />
          <div className="absolute right-5">
            {isSearching && <Spinner customClass="h-4 w-4" />}
          </div>
        </div>
        {openIngredients && (
          <span
            className="material-icons ml-auto flex cursor-pointer"
            onClick={handleCloseIngredients}
          >
            close_fullscreen
          </span>
        )}
      </div>
      {openIngredients && (
        <div className="relative flex flex-col gap-1 rounded-md">
          {openIngredient && (
            <div className="absolute z-50 flex h-full w-full flex-col gap-1 rounded-md bg-white p-2 dark:bg-black">
              <span
                onClick={handleCloseIngredient}
                className="material-icons ml-auto cursor-pointer"
              >
                close
              </span>
              <div className="flex h-full flex-col gap-1 overflow-auto rounded-md border p-1">
                <Image
                  src={openIngredient.image}
                  width={250}
                  height={250}
                  className="rounded-md"
                  alt={openIngredient.food_name || ""}
                />
                <div className="flex h-full w-full flex-col p-2">
                  <span>{openIngredient.food_name}</span>
                  <span className="text-xs opacity-50">
                    {openIngredient.food_description}
                  </span>
                </div>
              </div>
            </div>
          )}
          {Object.keys(searchResult).map((food) => (
            <div
              onClick={() => handleOpenIngredient(searchResult[food])}
              key={food}
              className="flex h-full items-start gap-1 overflow-auto rounded-md border"
            >
              <Image
                src={searchResult[food].image}
                height={100}
                width={100}
                alt={searchResult[food].food_name || ""}
              />
              <div className="flex h-full w-full flex-col p-2">
                <span>{searchResult[food].food_name}</span>
                <span className="text-xs opacity-50">
                  {searchResult[food].food_description}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientsSelector;
