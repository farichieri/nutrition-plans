import { FC } from "react";
import { IngredientGroup } from "@/features/foods/types";
import IngredientsSelector from "./IngredientsSelector";
import RecipeIngredients from "./RecipeIngredients";

interface Props {
  ingredients: IngredientGroup;
  handleUpdateIngredients: Function;
}

const Ingredients: FC<Props> = ({ ingredients, handleUpdateIngredients }) => {
  return (
    <div>
      <RecipeIngredients
        ingredients={ingredients}
        handleUpdateIngredients={handleUpdateIngredients}
      />
      <IngredientsSelector handleUpdateIngredients={handleUpdateIngredients} />
    </div>
  );
};

export default Ingredients;
