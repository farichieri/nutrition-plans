import {
  AddFoodIngredient,
  Food,
  FoodNutrition,
  setFoodOpened,
  setFoodOpenedScale,
} from "@/features/foods";
import { DietMeal } from "@/features/plans";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";

interface Props {
  food: Food;
  dietMeal?: DietMeal;
  handleCloseIngredient: Function;
}

const IngredientModal: FC<Props> = ({
  food,
  dietMeal,
  handleCloseIngredient,
}) => {
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
    <Modal
      onClose={handleCloseIngredient}
      customClass="rounded-none sm:rounded-3xl"
    >
      <div className="flex h-screen w-xl max-w-full flex-col items-center gap-5 overflow-auto p-4 sm:h-[90vh] sm:w-xl">
        <div className="m-auto flex w-full">
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
    </Modal>
  );
};

export default IngredientModal;
