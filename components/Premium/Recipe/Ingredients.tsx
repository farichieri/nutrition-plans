import {
  Ingredient,
  IngredientGroup,
  NutritionMeasurements,
} from "@/types/foodTypes";
import { FC } from "react";
import { getNewAmount } from "../Food/nutritionHelpers";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Loader/Spinner";
import { useSelector } from "react-redux";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";

interface IngredientProps {
  ingredient: Ingredient;
}
const Ingredient: FC<IngredientProps> = ({ ingredient }) => {
  const food = ingredient.food;
  const { foodOpened: recipe } = useSelector(selectFoodsSlice);
  const { food: foodData } = recipe;
  const { amount, weightName } = recipe.food_scale;

  if (!food || !food.scale_name || !food.scale_amount) {
    return (
      <div className="m-auto">
        <Spinner customClass="h-5 w-5" />
      </div>
    );
  }

  const ingGrams =
    food &&
    getNewAmount(
      food,
      food.scale_name,
      NutritionMeasurements.grams,
      food.scale_amount
    );

  console.log({ ingGrams });

  const calculateIngredientScale = () => {
    if (!foodData || !foodData.serving_grams || !ingGrams) return;

    // Deberia estar en el redux state de food scale.
    const recipeEquivalentInGrams = getNewAmount(
      foodData,
      weightName,
      NutritionMeasurements.grams,
      amount
    );
    console.log({ recipeEquivalentInGrams });
    const ingredientPart = (ingGrams / foodData.serving_grams) * 100;

    if (recipeEquivalentInGrams) {
      return (recipeEquivalentInGrams * ingredientPart) / 100;
    }
  };

  const ingScaleGramsAmount = calculateIngredientScale();
  console.log({ ingScaleGramsAmount });

  const ingScaleAmount =
    ingScaleGramsAmount &&
    getNewAmount(
      food,
      NutritionMeasurements.grams,
      food.scale_name,
      ingScaleGramsAmount
    );

  return (
    <Link
      href={`/app/food/${ingredient.food_id}`}
      className="flex w-full items-start rounded-md border"
    >
      <Image
        src={food.image}
        height={150}
        width={150}
        alt={food.food_name || ""}
        className="h-[100px] w-[100px] min-w-[100px] max-w-[100px] rounded-md object-cover"
      />
      <div className="flex h-full w-full flex-col px-2 py-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold capitalize">
            {food.food_name}
          </span>
          <span className="text-sm opacity-50">{food.food_description}</span>
          <span className="text-sm">{ingredient.text}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span>{ingScaleAmount && Math.round(ingScaleAmount)}</span>
          <span>{food.scale_name}</span>
          <span className="ml-5 text-sm opacity-50">
            {ingScaleGramsAmount && Math.round(ingScaleGramsAmount)}g
          </span>
        </div>
      </div>
    </Link>
  );
};
interface Props {
  ingredients: IngredientGroup;
}

const Ingredients: FC<Props> = (props) => {
  if (Object.keys(props.ingredients).length < 1) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-1">
      {Object.keys(props.ingredients).map((food_id) => (
        <Ingredient ingredient={props.ingredients[food_id]} key={food_id} />
      ))}
    </div>
  );
};

export default Ingredients;
