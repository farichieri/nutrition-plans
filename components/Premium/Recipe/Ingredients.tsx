import {
  Food,
  FoodGroup,
  Ingredient,
  NutritionMeasurements,
} from "@/types/foodTypes";
import { FC } from "react";
import { getNewAmount } from "../Food/nutritionHelpers";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Loader/Spinner";

const Ingredient = ({
  ingredient,
  foodIngredient,
}: {
  ingredient: Ingredient;
  foodIngredient: Food;
}) => {
  const { food } = useSelector(selectFoodsSlice);
  const { data: foodData } = food;
  const { amount, weightName } = food.scale;

  const ingGrams =
    foodIngredient &&
    getNewAmount(
      foodIngredient,
      ingredient.weight_name,
      NutritionMeasurements.grams,
      ingredient.amount
    );

  const calculateIngredientScale = () => {
    if (!foodData || !foodData.serving_grams || !ingGrams) return;

    // Deberia estar en el redux state de food scale.
    const recipeEquivalentInGrams = getNewAmount(
      foodData,
      weightName,
      NutritionMeasurements.grams,
      amount
    );

    const ingredientPart = (ingGrams / foodData.serving_grams) * 100;

    if (recipeEquivalentInGrams) {
      return (recipeEquivalentInGrams * ingredientPart) / 100;
    }
  };

  const ingScaleGramsAmount = calculateIngredientScale();

  const ingScaleAmount =
    ingScaleGramsAmount &&
    getNewAmount(
      foodIngredient,
      NutritionMeasurements.grams,
      ingredient.weight_name,
      ingScaleGramsAmount
    );

  if (!foodIngredient) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  return (
    <Link
      href={`/app/food/${ingredient.food_id}`}
      className="flex w-full items-start rounded-md border"
    >
      <Image
        src={foodIngredient.image}
        height={150}
        width={150}
        alt={foodIngredient.food_name || ""}
        className="h-[100px] w-[100px] min-w-[100px] max-w-[100px] rounded-md object-cover"
      />
      <div className="flex h-full w-full flex-col px-2 py-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold capitalize">
            {foodIngredient.food_name}
          </span>
          <span className="text-sm opacity-50">
            {foodIngredient.food_description}
          </span>
          <span className="text-sm">{ingredient.text}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span>{ingScaleAmount && Math.round(ingScaleAmount)}</span>
          <span>{ingredient.weight_name}</span>
          <span className="ml-5 text-sm opacity-50">
            {ingScaleGramsAmount && Math.round(ingScaleGramsAmount)}g
          </span>
        </div>
      </div>
    </Link>
  );
};

interface Props {
  foodIngredients: FoodGroup;
  ingredients: Ingredient[];
}

const Ingredients: FC<Props> = ({ foodIngredients, ingredients }) => {
  if (Object.keys(foodIngredients).length < 1) {
    return <Spinner customClass="h-5 w-5" />;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-3xl font-semibold">Ingredients:</span>

      {ingredients.map((ing) => (
        <Ingredient
          foodIngredient={foodIngredients[ing.food_id]}
          ingredient={ing}
          key={ing.food_id}
        />
      ))}
    </div>
  );
};

export default Ingredients;
