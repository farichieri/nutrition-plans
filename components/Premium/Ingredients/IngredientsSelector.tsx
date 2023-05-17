import {
  selectCreateFoodSlice,
  setIngredientOpened,
} from "@/store/slices/createFoodSlice";
import { FC, useEffect, useState } from "react";
import { Food } from "@/types/foodTypes";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import IngredientData from "./IngredientData";
import SearchBar from "../Food/FoodSearch/SearchBar";

interface Props {}

const IngredientsSelector: FC<Props> = () => {
  const dispatch = useDispatch();
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const [searchResult, setSearchResult] = useState(foodsSearched);
  const { ingredientOpened } = useSelector(selectCreateFoodSlice);
  const [openIngredients, setOpenIngredients] = useState(false);

  useEffect(() => {
    setSearchResult(foodsSearched);
  }, [foodsSearched]);

  const handleCloseIngredients = () => {
    setOpenIngredients(false);
    handleCloseIngredient();
  };

  const handleOpenIngredient = (ingredient: Food) => {
    dispatch(setIngredientOpened(ingredient));
  };

  const handleCloseIngredient = () => {
    dispatch(setIngredientOpened(null));
  };

  console.log({ ingredientOpened });

  return (
    <>
      <div className="flex items-center">
        <SearchBar onFocus={() => setOpenIngredients(true)} />
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
          {ingredientOpened && (
            <div className="absolute z-50 flex h-auto w-full flex-col gap-1 rounded-md bg-gray-200 dark:bg-black">
              <div className="relative flex h-full flex-col gap-1 overflow-auto rounded-md border p-1">
                <span
                  onClick={handleCloseIngredient}
                  className="material-icons ml-auto cursor-pointer"
                >
                  close
                </span>
                <IngredientData food={ingredientOpened} />
              </div>
            </div>
          )}
          {Object.keys(searchResult).map((food) => (
            <div
              onClick={() => handleOpenIngredient(searchResult[food])}
              key={food}
              className="flex h-full cursor-pointer items-start gap-1 overflow-auto rounded-md border"
            >
              <Image
                src={searchResult[food].image}
                height={100}
                width={100}
                alt={searchResult[food].food_name || ""}
                className="h-[100px] min-h-[100px] w-[100px] min-w-[100px] object-cover"
              />
              <div className="flex h-full w-full flex-col p-2">
                <span className="text-lg font-semibold capitalize">
                  {searchResult[food].food_name}
                </span>
                <span className="text-xs opacity-50">
                  {searchResult[food].food_description}
                </span>
                <span className="text-xs text-green-500">
                  {searchResult[food].kind}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default IngredientsSelector;
