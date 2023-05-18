import { DietMeal, DietMealGroup } from "@/types/dietTypes";
import { FC, useState } from "react";
import { Food } from "@/types/foodTypes";
import { selectFoodsSlice, setFoodOpened } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import DietMealFoods from "./DietMealFoods";
import IngredientModal from "../../Ingredients/IngredientModal";
import SearchBar from "../../SearchBar/SearchBar";
import SearchedResults from "../../SearchBar/SearchedResults";

interface MealProps {
  dietMeal: DietMeal;
}

const DietMeal: FC<MealProps> = ({ dietMeal }) => {
  const dispatch = useDispatch();
  const { foodsSearched, foodOpened } = useSelector(selectFoodsSlice);
  const [showSearched, setShowSearched] = useState(false);
  const [thisFoodOpened, setThisFoodOpened] = useState<boolean>(false);

  const handleOpenFood = (food: Food) => {
    dispatch(setFoodOpened(food));
    setThisFoodOpened(true);
  };

  const handleCloseIngredients = () => {
    setShowSearched(false);
    handleCloseIngredient();
  };

  const handleCloseIngredient = () => {
    dispatch(setFoodOpened(null));
    setThisFoodOpened(false);
  };

  return (
    <div className="relative flex flex-col gap-4 rounded-md border p-1">
      <span className="uppercase">{dietMeal.diet_meal_type}</span>
      <DietMealFoods dietMeal={dietMeal} />

      <SearchBar onFocus={() => setShowSearched(true)} preFetch={false} />
      {showSearched && (
        <span
          className="material-icons ml-auto flex cursor-pointer"
          onClick={handleCloseIngredients}
        >
          close_fullscreen
        </span>
      )}
      {showSearched && (
        <SearchedResults
          searchResult={foodsSearched}
          handleClick={handleOpenFood}
        />
      )}
      {foodOpened.food && thisFoodOpened && (
        <div className="absolute z-50 flex h-auto w-auto flex-col gap-1 rounded-md bg-gray-200 dark:bg-black">
          <div className="relative flex h-full flex-col gap-1 overflow-auto rounded-md border p-1">
            <span
              onClick={handleCloseIngredient}
              className="material-icons ml-auto cursor-pointer"
            >
              close
            </span>
            <IngredientModal food={foodOpened.food} dietMeal={dietMeal} />
          </div>
        </div>
      )}
    </div>
  );
};

interface Props {
  dietMeals: DietMealGroup;
}

const DietMeals: FC<Props> = ({ dietMeals }) => {
  console.log({ dietMeals });
  return (
    <div>
      <div className="flex w-full flex-col gap-5 rounded-md border p-1">
        {Object.keys(dietMeals).map((dietMeal) => (
          <DietMeal key={dietMeal} dietMeal={dietMeals[dietMeal]} />
        ))}
      </div>
    </div>
  );
};

export default DietMeals;
