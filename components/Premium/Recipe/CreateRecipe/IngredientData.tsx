import { FC } from "react";
import { Food } from "@/types/foodTypes";
import FoodNutrition from "../../Food/FoodNutrition";
import Image from "next/image";

interface Props {
  ingredient: Food;
}

const IngredientData: FC<Props> = ({ ingredient }) => {
  return (
    <div className="sm:-4 flex flex-col gap-5 p-2">
      <div className="flex">
        <div className="relative m-auto flex h-40 w-full basis-1/2 sm:h-60 ">
          <Image
            src={ingredient.image}
            fill
            className="rounded-md object-cover"
            alt={ingredient.food_name || ""}
          />
        </div>
        <div className="flex h-full w-full basis-1/2 flex-col p-2">
          <span className="text-3xl font-semibold capitalize">
            {ingredient.food_name}
          </span>
          <span className="text-sm capitalize opacity-50">
            {ingredient.food_description}
          </span>
        </div>
      </div>
      <FoodNutrition isIngredient={true} foodProp={ingredient} />
    </div>
  );
};

export default IngredientData;
