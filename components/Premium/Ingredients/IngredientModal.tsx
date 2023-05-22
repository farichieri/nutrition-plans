import { DietMeal } from "@/types/dietTypes";
import { FC, useEffect } from "react";
import { Food } from "@/types/foodTypes";
import { setFoodOpened, setFoodOpenedScale } from "@/store/slices/foodsSlice";
import { useDispatch } from "react-redux";
import AddFoodIngredient from "../Food/AddFood/AddFoodIngredient";
import FoodNutrition from "../Food/FoodNutrition";
import Image from "next/image";

interface Props {
  food: Food;
  dietMeal?: DietMeal;
}

const IngredientModal: FC<Props> = ({ food, dietMeal }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setFoodOpenedScale({
        amount: food.serving_amount || 100,
        weightName: food.serving_name || "grams",
      })
    );
    dispatch(setFoodOpened(food));
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
      <AddFoodIngredient dietMeal={dietMeal} />
      <FoodNutrition
        food={food}
        amount={Number(food.serving_amount)}
        scale={String(food.serving_name)}
      />
    </div>
  );
};

export default IngredientModal;