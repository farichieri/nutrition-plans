import {
  AddFoodIngredient,
  CompatiblePlansC,
  Food,
  FoodNutrition,
  setFoodModal,
  setFoodModalScale,
} from "@/features/foods";
import { FC, MouseEventHandler, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";

interface Props {
  food: Food;
  handleClose: Function;
  handleAdd: MouseEventHandler;
}

const FoodModal: FC<Props> = ({ food, handleClose, handleAdd }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFoodModal(food));
  }, [food]);

  const setLocalScale = (scale_amount: number, scale_name: string) => {
    dispatch(
      setFoodModalScale({
        scale_amount: scale_amount,
        scale_name: scale_name,
      })
    );
  };

  const { scale_amount, scale_name } = food;

  return (
    <Modal onClose={handleClose} customClass="rounded-none sm:rounded-3xl">
      <div className="flex h-screen w-xl max-w-full flex-col items-center  overflow-auto  sm:h-[95vh] sm:w-4xl">
        <div className="mt-5 flex w-full flex-col items-center gap-2 border-b p-4">
          <div className="flex w-full gap-2">
            <div className="relative flex h-40 w-full basis-1/2 sm:h-60 ">
              <Image
                src={food.image}
                fill
                className="rounded-md object-cover"
                alt={food.food_name || ""}
              />
            </div>
            <div className="flex h-full w-full basis-1/2 flex-col ">
              <span className="text-xl font-semibold capitalize sm:text-3xl">
                {food.food_name}
              </span>
              <span className="text-sm capitalize opacity-50">
                {food.food_description}
              </span>
            </div>
          </div>
          <AddFoodIngredient
            food={food}
            scale_amount={scale_amount}
            handleAddIngredient={handleAdd}
            scale_name={scale_name}
            setLocalScale={setLocalScale}
          />
        </div>
        <div className="flex w-full flex-col gap-5 overflow-auto p-4">
          <CompatiblePlansC compatible_plans={food.compatible_plans} />
          <FoodNutrition food={food} amount={scale_amount} scale={scale_name} />
        </div>
      </div>
    </Modal>
  );
};

export default FoodModal;
