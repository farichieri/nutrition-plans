import { FC } from "react";
import { Food, Ingredient, NutritionMeasurements } from "@/types/foodTypes";
import { getNewAmount } from "../../../utils/nutritionHelpers";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Loader/Spinner";

interface IngredientProps {
  amount: number;
  food: Food;
  ingredient: Ingredient;
  scale: string;
}
const Ingredient: FC<IngredientProps> = ({
  food,
  ingredient,
  amount,
  scale,
}) => {
  const recipe = food;
  const foodIngredient = ingredient;

  if (!food || !food.scale_name || !food.scale_amount) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  const ingGrams =
    foodIngredient &&
    getNewAmount(
      foodIngredient,
      String(foodIngredient.scale_name),
      NutritionMeasurements.grams,
      Number(foodIngredient.scale_amount)
    );

  const calculateIngredientScale = () => {
    if (!foodIngredient || !foodIngredient.serving_grams || !ingGrams) return;

    const recipeEquivalentInGrams = getNewAmount(
      recipe,
      String(scale || recipe.scale_name),
      NutritionMeasurements.grams,
      Number(amount || recipe.scale_amount)
    );
    const ingredientPart = (ingGrams / Number(recipe.serving_grams)) * 100;

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
      String(foodIngredient.scale_name),
      ingScaleGramsAmount
    );

  return (
    <Link
      href={`/app/food/${foodIngredient.food_id}`}
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
          <span className="text-sm">{foodIngredient.text}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span>{ingScaleAmount && Math.round(ingScaleAmount)}</span>
          <span className="capitalize">{foodIngredient.scale_name}</span>
          <span className="ml-5 text-sm opacity-50">
            {ingScaleGramsAmount && Math.round(ingScaleGramsAmount)}g
          </span>
        </div>
      </div>
    </Link>
  );
};
interface Props {
  food: Food;
  amount: number;
  scale: string;
}

const Ingredients: FC<Props> = ({ food, amount, scale }) => {
  const ingsSorted = Object.values(food.ingredients).sort(
    (a, b) => a.order - b.order
  );

  if (ingsSorted.length < 1) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-semibold">Ingredients:</span>
      {ingsSorted.map((ingredient) => {
        if (ingredient.food_id)
          return (
            <Ingredient
              food={food}
              ingredient={food.ingredients[ingredient.food_id]}
              key={ingredient.food_id}
              amount={amount}
              scale={scale}
            />
          );
      })}
    </div>
  );
};

export default Ingredients;
