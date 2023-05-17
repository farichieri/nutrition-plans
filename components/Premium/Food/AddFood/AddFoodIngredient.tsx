import {
  selectCreateFoodSlice,
  setIngredientOpened,
  setMealState,
  setRecipeState,
} from "@/store/slices/createFoodSlice";
import {
  Food,
  FoodGroup,
  Ingredient,
  IngredientGroup,
} from "@/types/foodTypes";
import { AppRoutes } from "@/utils/routes";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

interface Props {
  weight_name: string;
  amount: number;
  food: Food;
}

const AddFoodIngredient: FC<Props> = ({ weight_name, amount, food }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { recipeState, mealState } = useSelector(selectCreateFoodSlice);

  if (!food.food_id) return <>No food_id found</>;

  const handleIngredient = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    const newIngredient: Ingredient = {
      food: {
        ...food,
        scale_amount: amount,
        scale_name: weight_name,
      },
      food_id: food.food_id,
      order: 0,
      text: "",
    };

    if (router.asPath === AppRoutes.create_recipe) {
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
      dispatch(setIngredientOpened(null));
    } else if (router.asPath === AppRoutes.create_meal) {
      const newFoods: IngredientGroup = {
        ...mealState.foods,
        [food.food_id as keyof Food]: newIngredient,
      };
      dispatch(
        setMealState({
          ...mealState,
          foods: newFoods,
        })
      );
      dispatch(setIngredientOpened(null));
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
