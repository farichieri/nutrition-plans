import { FC, useEffect, useState } from "react";
import { Food } from "@/types/foodTypes";
import { selectFoodsSlice, setFoodOpened } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import IngredientModal from "./IngredientModal";
import SearchBarCreate from "../SearchBar/SearchBarCreate";
import SearchedResults from "../SearchBar/SearchedResults";

interface Props {}

const IngredientsSelector: FC<Props> = () => {
  const dispatch = useDispatch();
  const { foodsSearched, foodOpened } = useSelector(selectFoodsSlice);
  const [searchResult, setSearchResult] = useState(foodsSearched);
  const [openIngredients, setOpenIngredients] = useState(false);

  useEffect(() => {
    setSearchResult(foodsSearched);
  }, [foodsSearched]);

  const handleCloseIngredients = () => {
    setOpenIngredients(false);
    handleCloseIngredient();
  };

  const handleOpenIngredient = (ingredient: Food) => {
    dispatch(setFoodOpened(ingredient));
  };

  const handleCloseIngredient = () => {
    dispatch(setFoodOpened(null));
  };

  return (
    <>
      <div className="flex items-center">
        <SearchBarCreate
          onFocus={() => setOpenIngredients(true)}
          preFetch={false}
        />
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
          {foodOpened.food && (
            <div className="absolute z-50 flex h-full w-full flex-col gap-1 overflow-auto rounded-md bg-gray-200 dark:bg-black">
              <div className="relative flex h-full flex-col gap-1 overflow-auto rounded-md border p-1">
                <span
                  onClick={handleCloseIngredient}
                  className="material-icons ml-auto cursor-pointer"
                >
                  close
                </span>
                <IngredientModal food={foodOpened.food} />
              </div>
            </div>
          )}
          <SearchedResults
            searchResult={searchResult}
            handleClick={handleOpenIngredient}
          />
        </div>
      )}
    </>
  );
};

export default IngredientsSelector;
