import {
  Food,
  Ingredient,
  NutritionMeasurements,
  getAllScales,
  orderScales,
} from "@/features/foods";
import { FC } from "react";
import { getNewAmount } from "../../../../../utils/nutritionHelpers";
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

  if (!food) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  const ingredientScalesMerged = getAllScales({
    scales: foodIngredient.scales,
  });
  const recipeScalesMerged = getAllScales({ scales: recipe.scales });

  const ingGrams =
    foodIngredient &&
    getNewAmount({
      scales: ingredientScalesMerged,
      prev_scale_name: String(foodIngredient.scaleName),
      new_scale_name: NutritionMeasurements.grams,
      scaleAmount: Number(foodIngredient.scaleAmount),
    });

  const calculateIngredientScale = () => {
    if (!foodIngredient || !foodIngredient.servingGrams || !ingGrams) return;

    const recipeEquivalentInGrams = getNewAmount({
      scales: recipeScalesMerged,
      prev_scale_name: String(recipe.scaleName),
      new_scale_name: NutritionMeasurements.grams,
      scaleAmount: Number(amount || recipe.scaleAmount),
    });
    const ingredientPart = (ingGrams / Number(recipe.servingGrams)) * 100;

    if (recipeEquivalentInGrams) {
      return (recipeEquivalentInGrams * ingredientPart) / 100;
    }
  };

  const ingScaleGramsAmount = calculateIngredientScale();

  const ingScaleAmount =
    ingScaleGramsAmount &&
    getNewAmount({
      scales: ingredientScalesMerged,
      prev_scale_name: NutritionMeasurements.grams,
      new_scale_name: String(foodIngredient.scaleName),
      scaleAmount: ingScaleGramsAmount,
    });

  return (
    <Link
      href={`/app/food/${foodIngredient.id}`}
      className="flex w-full items-start rounded-md border"
    >
      <Image
        src={foodIngredient.imageURL}
        height={150}
        width={150}
        alt={foodIngredient.name || ""}
        className="h-[100px] w-[100px] min-w-[100px] max-w-[100px] rounded-md object-cover"
      />
      <div className="flex h-full w-full flex-col px-2 py-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold capitalize">
            {foodIngredient.name}
          </span>
          <span className="text-sm opacity-50">
            {foodIngredient.description}
          </span>
          <span className="text-sm">{foodIngredient.text}</span>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span>{ingScaleAmount && Math.round(ingScaleAmount)}</span>
          <span className="capitalize">{foodIngredient.scaleName}</span>
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
        if (ingredient.id)
          return (
            <Ingredient
              food={food}
              ingredient={food.ingredients[ingredient.id]}
              key={ingredient.id}
              amount={amount}
              scale={scale}
            />
          );
      })}
    </div>
  );
};

export default Ingredients;
