import {
  selectCreateFoodSlice,
  setMealState,
  setRecipeState,
} from "@/store/slices/createFoodSlice";
import { AppRoutes } from "@/utils/routes";
import { FC } from "react";
import { Food, Ingredient, IngredientGroup } from "@/types/foodTypes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectFoodsSlice, setFoodOpened } from "@/store/slices/foodsSlice";
import { Diet, DietMeal, DietMealGroup } from "@/types/dietTypes";
import {
  selectCreateDietSlice,
  setDietState,
} from "@/store/slices/createDietSlice";

interface Props {
  dietMeal?: DietMeal;
}

const AddFoodIngredient: FC<Props> = ({ dietMeal }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { dietState } = useSelector(selectCreateDietSlice);
  const { foodOpened } = useSelector(selectFoodsSlice);
  const { recipeState, mealState } = useSelector(selectCreateFoodSlice);
  const food = foodOpened.food;
  const isCreateMeal = router.asPath === AppRoutes.create_meal;
  const isCreateRecipe = router.asPath === AppRoutes.create_recipe;
  const isCreateDiet = router.asPath === AppRoutes.create_diet;

  if (!food?.food_id) return <>No food_id found</>;

  const handleIngredient = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    const newIngredient: Ingredient = {
      food: {
        ...food,
        scale_amount: foodOpened.food_scale.amount,
        scale_name: foodOpened.food_scale.weightName,
      },
      food_id: food.food_id,
      order: 0,
      text: "",
    };

    if (isCreateRecipe) {
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
    } else if (isCreateMeal) {
      const newFoods: IngredientGroup = {
        ...mealState.ingredients,
        [food.food_id as keyof Food]: newIngredient,
      };
      dispatch(
        setMealState({
          ...mealState,
          ingredients: newFoods,
        })
      );
      dispatch(setFoodOpened(null));
    } else if (isCreateDiet && dietMeal && food.food_id && dietMeal.diet_id) {
      let diet_meal_foods = { ...dietMeal.diet_meal_foods };

      const newDietMealFoods = { ...diet_meal_foods };
      newDietMealFoods[food.food_id] = food;

      let newDietMeal: DietMeal = {
        ...dietMeal,
        diet_meal_foods: newDietMealFoods,
      };

      let newDietMeals: DietMealGroup = {
        ...dietState.diet_meals,
      };

      newDietMeals[dietMeal.diet_id] = newDietMeal;

      const newDietState: Diet = {
        ...dietState,
        diet_meals: newDietMeals,
      };

      dispatch(setDietState(newDietState));
      dispatch(setFoodOpened(null));
    }
  };

  return (
    <div>
      <button
        onClick={handleIngredient}
        className="m-auto flex w-fit items-center gap-1 rounded-3xl border bg-green-600 py-1.5 pl-2 pr-4 duration-300 hover:bg-green-500 active:scale-95"
      >
        <span className="material-icons pointer-events-none">add</span>
        <span className="pointer-events-none">Add</span>
      </button>
    </div>
  );
};

export default AddFoodIngredient;
