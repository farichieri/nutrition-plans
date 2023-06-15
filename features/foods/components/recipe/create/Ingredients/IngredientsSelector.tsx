import {
  selectFoodsSlice,
  Food,
  Ingredient,
  IngredientGroup,
  setFoodModal,
} from "@/features/foods";
import { FC, useEffect, useState } from "react";
import { FilterQueries } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import Filters from "@/components/Premium/SearchBar/Filters";
import FoodModal from "../../../common/FoodModal";
import RoundButton from "@/components/Buttons/RoundButton";
import SearchBarCreate from "@/components/Premium/SearchBar/SearchBarCreate";
import SearchedResults from "@/components/Premium/SearchBar/SearchedResults";

interface Props {
  handleUpdateIngredients: Function;
}

const IngredientsSelector: FC<Props> = ({ handleUpdateIngredients }) => {
  const dispatch = useDispatch();
  const { foodsSearched, foodModal } = useSelector(selectFoodsSlice);
  const [searchResult, setSearchResult] = useState(foodsSearched);
  const [openIngredients, setOpenIngredients] = useState(false);
  const noData = Object.keys(searchResult).length < 1;
  const { newRecipeState } = useSelector(selectFoodsSlice);

  useEffect(() => {
    setSearchResult(foodsSearched);
  }, [foodsSearched]);

  const handleOpenIngredient = (ingredient: Food) => {
    dispatch(setFoodModal(ingredient));
  };

  const handleCloseIngredient = () => {
    dispatch(setFoodModal(null));
  };

  const [queries, setLocalQueries] = useState<FilterQueries>({});

  const handleAddIngredient = (): void => {
    if (!foodModal) return;
    const newIngredient: Ingredient = {
      ...foodModal,
      scale_amount: foodModal.scale_amount,
      scale_name: foodModal.scale_name,
    };

    const newIngredients: IngredientGroup = {
      ...newRecipeState.ingredients,
      [foodModal.food_id as keyof Food]: newIngredient,
    };
    handleUpdateIngredients(newIngredients);
    dispatch(setFoodModal(null));
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
          {foodModal && (
            <div className="absolute flex h-full w-full flex-col gap-1 overflow-auto rounded-md bg-gray-200 dark:bg-black">
              <div className="relative flex h-full flex-col gap-1 overflow-auto rounded-md border p-1">
                <span
                  onClick={handleCloseIngredient}
                  className="material-icons ml-auto cursor-pointer"
                >
                  close
                </span>
                <FoodModal
                  handleClose={handleCloseIngredient}
                  food={foodModal}
                  handleAdd={handleAddIngredient}
                />
              </div>
            </div>
          )}
          <div className="max-h-[50vh] overflow-auto border-y py-2">
            <SearchedResults
              searchResult={searchResult}
              handleClick={handleOpenIngredient}
              queries={queries}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientsSelector;
