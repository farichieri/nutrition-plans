import { FC } from "react";
import { Food, FoodGroup, Ingredient } from "@/types/foodTypes";
import Image from "next/image";
import Spinner from "@/components/Loader/Spinner";
import Link from "next/link";

const Ingredient = ({
  ingredient,
  foodIngredient,
}: {
  ingredient: Ingredient;
  foodIngredient: Food;
}) => {
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
        height={125}
        width={125}
        alt={foodIngredient.food_name || ""}
        className="rounded-md"
      />
      <div className="flex h-full w-full flex-col px-2">
        <div className="flex flex-col">
          <span className="text-base font-semibold capitalize">
            {foodIngredient.food_name}
          </span>
          <span className="text-sm opacity-50">
            {foodIngredient.food_description}
          </span>
          <span className="">{ingredient.text}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{ingredient.amount}</span>
          <span>{ingredient.weight_name}</span>
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
    <div className="flex w-full flex-col gap-1">
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
