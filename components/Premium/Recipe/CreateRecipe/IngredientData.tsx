import { FC } from "react";
import { Food } from "@/types/foodTypes";
import Image from "next/image";
import FoodNutrition from "../../Food/FoodNutrition";

interface Props {
  ingredient: Food;
}

const IngredientData: FC<Props> = ({ ingredient }) => {
  return (
    <div>
      <div className="relative flex h-full flex-col gap-1 overflow-auto rounded-md border p-1">
        <div className="relative m-auto flex h-72 w-full sm:h-96 ">
          <Image
            src={ingredient.image}
            fill
            className="rounded-md"
            alt={ingredient.food_name || ""}
          />
        </div>
        <div className="flex h-full w-full flex-col p-2">
          <span className="text-3xl font-semibold capitalize">
            {ingredient.food_name}
          </span>
          <span className="text-sm capitalize opacity-50">
            {ingredient.food_description}
          </span>
        </div>
        <FoodNutrition isIngredient={true} foodProp={ingredient} />
      </div>
    </div>
  );
};

export default IngredientData;
