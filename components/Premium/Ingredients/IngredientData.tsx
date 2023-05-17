import { FC, useEffect } from "react";
import { Food } from "@/types/foodTypes";
import { setFood, setScale } from "@/store/slices/foodsSlice";
import { useDispatch } from "react-redux";
import FoodNutrition from "../Food/FoodNutrition";
import Image from "next/image";

interface Props {
  food: Food;
}

const IngredientData: FC<Props> = ({ food }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setScale({
        amount: food.serving_amount || 100,
        weightName: food.serving_name || "grams",
      })
    );
    dispatch(setFood(food));
  }, [food]);

  return (
    <div className="sm:-4 flex flex-col gap-5 p-2">
      <div className="flex">
        <div className="relative m-auto flex h-40 w-full basis-1/2 sm:h-60 ">
          <Image
            src={food.image}
            fill
            className="rounded-md object-cover"
            alt={food.food_name || ""}
          />
        </div>
        <div className="flex h-full w-full basis-1/2 flex-col p-2">
          <span className="text-3xl font-semibold capitalize">
            {food.food_name}
          </span>
          <span className="text-sm capitalize opacity-50">
            {food.food_description}
          </span>
        </div>
      </div>
      <FoodNutrition isIngredient={true} foodProp={food} />
    </div>
  );
};

export default IngredientData;
