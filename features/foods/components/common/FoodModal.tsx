import {
  AddFoodIngredient,
  CompatiblePlansC,
  Food,
  FoodNutrition,
  fetchFoodByID,
  setFoodModal,
  setFoodModalScale,
} from "@/features/foods";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  food: Food;
  handleClose: Function;
  handleAdd: MouseEventHandler;
}

const FoodModal: FC<Props> = ({ food, handleClose, handleAdd }) => {
  const dispatch = useDispatch();
  const { id } = food;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the food from firestore
    if (!id) return;
    const fetchFoodID = async () => {
      const res = await fetchFoodByID(id);
      if (res.result === "success") {
        dispatch(setFoodModal(res.data));
        setIsLoading(false);
      }
    };
    fetchFoodID();
  }, [id, dispatch]);

  const { scaleAmount, scaleName: scaleName } = food;

  if (!id || isLoading)
    return (
      <div className="absolute inset-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
        <Spinner customClass="h-5 w-5" />
      </div>
    );

  const setLocalScale = (scaleAmount: number, scaleName: string) => {
    dispatch(
      setFoodModalScale({
        scaleAmount: scaleAmount,
        scaleName: scaleName,
      })
    );
  };

  return (
    <Modal onClose={handleClose} isMobileFullScreen={true}>
      <div className="flex h-screen w-xl max-w-full flex-col items-center  overflow-auto  sm:h-[95vh] sm:w-4xl">
        <div className="mt-5 flex w-full flex-col items-center gap-2 border-b p-4">
          <div className="flex w-full gap-2">
            <div className="relative flex h-40 w-full basis-1/2 sm:h-60 ">
              <Image
                src={food.imageURL}
                fill
                className="rounded-md object-cover"
                alt={food.name || ""}
              />
            </div>
            <div className="flex h-full w-full basis-1/2 flex-col ">
              <span className="text-xl font-semibold capitalize sm:text-3xl">
                {food.name}
              </span>
              <span className="text-sm capitalize opacity-50">
                {food.description}
              </span>
            </div>
          </div>
          <AddFoodIngredient
            food={food}
            scaleAmount={scaleAmount}
            handleAddIngredient={handleAdd}
            scaleName={scaleName}
            setLocalScale={setLocalScale}
          />
        </div>
        <div className="flex w-full flex-col gap-5 overflow-auto p-4">
          <CompatiblePlansC compatiblePlans={food.compatiblePlans} />
          <FoodNutrition food={food} amount={scaleAmount} scale={scaleName} />
        </div>
      </div>
    </Modal>
  );
};

export default FoodModal;
