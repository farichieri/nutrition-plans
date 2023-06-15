// basic-food
import FoodCreate from "./basic-food/create/FoodCreate";

// recipe
import Instructions from "./recipe/instructions/Instructions";

import AddInstruction from "./recipe/create/Instructions/AddInstruction";
import InstructionsCreate from "./recipe/create/Instructions/RecipeInstructions";
import RecipeCreate from "./recipe/create/RecipeCreate";

import AddFoodIngredient from "./recipe/Ingredients/AddFoodIngredient";
import FoodModal from "./common/FoodModal";
import Ingredients from "./recipe/Ingredients/Ingredients";
import IngredientsNutrition from "./recipe/create/RecipeNutrition";
import IngredientsSelector from "./recipe/create/Ingredients/IngredientsSelector";
import RecipeIngredients from "./recipe/create/Ingredients/RecipeIngredients";

// search-food
import FoodsSearched from "./search-food/FoodsSearched/FoodsSearched";

// common
import FoodActions from "./common/FoodActions";
import FoodNutrition from "./common/FoodNutrition";
import FoodNutritionDetail from "./common/FoodNutritionDetail";
import CompatiblePlansC from "./common/CompatiblePlansC";
import ScaleSelector from "./common/ScaleSelector";
import ExtraScales from "./common/ExtraScales";

export {
  AddFoodIngredient,
  AddInstruction,
  CompatiblePlansC,
  FoodActions,
  FoodCreate,
  FoodNutrition,
  FoodNutritionDetail,
  FoodsSearched,
  FoodModal,
  Ingredients,
  IngredientsNutrition,
  IngredientsSelector,
  Instructions,
  InstructionsCreate,
  RecipeCreate,
  RecipeIngredients as RecipeCreateIngredients,
  ScaleSelector,
  ExtraScales,
};
