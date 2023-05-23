import { DietMeal, DietMealGroup } from "@/types/dietTypes";
import { FC, useState } from "react";
import { Food } from "@/types/foodTypes";
import { selectFoodsSlice, setFoodOpened } from "@/store/slices/foodsSlice";
import { useDispatch, useSelector } from "react-redux";
import DietMealFoods from "./DietMealFoods";
import IngredientModal from "../../Ingredients/IngredientModal";
import SearchBarCreate from "../../SearchBar/SearchBarCreate";
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
    <div className="relative flex flex-col rounded-md border">
      <div className="flex w-full flex-col gap-2 p-2">
        <span className="uppercase">{dietMeal.diet_meal_type}</span>
        <DietMealFoods dietMeal={dietMeal} />

        <SearchBarCreate
          onFocus={() => setShowSearched(true)}
          preFetch={false}
        />
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
      </div>

      {foodOpened.food && thisFoodOpened && (
        <div className="absolute z-50 flex h-full w-full  flex-col overflow-auto rounded-md border border-black bg-gray-200 dark:border-white dark:bg-black">
          <div className="flex w-full border-b border-black dark:border-white">
            <span
              onClick={handleCloseIngredient}
              className="material-icons ml-auto cursor-pointer"
            >
              close
            </span>
          </div>
          <IngredientModal food={foodOpened.food} dietMeal={dietMeal} />
        </div>
      )}
    </div>
  );
};

interface Props {
  dietMeals: DietMealGroup;
}

const DietMeals: FC<Props> = ({ dietMeals }) => {
  return (
    <div>
      <div className="flex w-full flex-col gap-5 rounded-md  p-1">
        {Object.keys(dietMeals).map((dietMeal) => (
          <DietMeal key={dietMeal} dietMeal={dietMeals[dietMeal]} />
        ))}
      </div>
    </div>
  );
};

export default DietMeals;
