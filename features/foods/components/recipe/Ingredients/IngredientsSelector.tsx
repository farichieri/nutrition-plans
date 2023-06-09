import { FC, useEffect, useState } from "react";
import { FilterQueries } from "@/types";
import {
  selectFoodsSlice,
  setFoodOpened,
  Food,
  setRecipeState,
  Ingredient,
  IngredientGroup,
} from "@/features/foods";
import { useDispatch, useSelector } from "react-redux";
import Filters from "@/components/Premium/SearchBar/Filters";
import IngredientModal from "./IngredientModal";
import RoundButton from "@/components/Buttons/RoundButton";
import SearchBarCreate from "@/components/Premium/SearchBar/SearchBarCreate";
import SearchedResults from "@/components/Premium/SearchBar/SearchedResults";

interface Props {}

const IngredientsSelector: FC<Props> = () => {
  const dispatch = useDispatch();
  const { foodsSearched, foodOpened } = useSelector(selectFoodsSlice);
  const { food } = foodOpened;
  const [searchResult, setSearchResult] = useState(foodsSearched);
  const [openIngredients, setOpenIngredients] = useState(false);
  const noData = Object.keys(searchResult).length < 1;
  const { recipeState } = useSelector(selectFoodsSlice);

  useEffect(() => {
    setSearchResult(foodsSearched);
  }, [foodsSearched]);

  const handleOpenIngredient = (ingredient: Food) => {
    dispatch(setFoodOpened(ingredient));
  };

  const handleCloseIngredient = () => {
    dispatch(setFoodOpened(null));
  };

  const [queries, setLocalQueries] = useState<FilterQueries>({});

  const handleAddIngredient = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (!food) return;
    const newIngredient: Ingredient = {
      ...food,
      scale_amount: foodOpened.food_scale.amount,
      scale_name: foodOpened.food_scale.weightName,
    };

    const newIngredients: IngredientGroup = {
      ...recipeState.ingredients,
      [food.food_id as keyof Food]: newIngredient,
    };
    dispatch(
      setRecipeState({
        ...recipeState,
        ingredients: newIngredients,
      })
    );
    dispatch(setFoodOpened(null));
  };

  return (
    <>
      <div className="flex w-full flex-col p-4">
        <SearchBarCreate
          onFocus={() => setOpenIngredients(true)}
          preFetch={false}
        />
        <Filters
          updateRoute={false}
          queries={queries}
          setLocalQueries={setLocalQueries}
        />
        {!noData && (
          <>
            {!openIngredients ? (
              <RoundButton
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIngredients(true);
                }}
                customClass="h-10 w-10 ml-auto mt-4"
              >
                <span className="material-icons">open_in_full</span>
              </RoundButton>
            ) : (
              <RoundButton
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIngredients(false);
                }}
                customClass="h-10 w-10 ml-auto mt-4"
              >
                <span className="material-icons">close_fullscreen</span>
              </RoundButton>
            )}
          </>
        )}
      </div>
      {openIngredients && (
        <div className="relative flex flex-col gap-1 rounded-md">
          {foodOpened.food && (
            <div className="absolute flex h-full w-full flex-col gap-1 overflow-auto rounded-md bg-gray-200 dark:bg-black">
              <div className="relative flex h-full flex-col gap-1 overflow-auto rounded-md border p-1">
                <span
                  onClick={handleCloseIngredient}
                  className="material-icons ml-auto cursor-pointer"
                >
                  close
                </span>
                <IngredientModal
                  handleClose={handleCloseIngredient}
                  food={foodOpened.food}
                  handleAdd={handleAddIngredient}
                />
              </div>
            </div>
          )}
          <SearchedResults
            searchResult={searchResult}
            handleClick={handleOpenIngredient}
            queries={queries}
          />
        </div>
      )}
    </>
  );
};

export default IngredientsSelector;
