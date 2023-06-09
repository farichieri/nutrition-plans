import { FC, MouseEventHandler } from "react";
import { Food, ScaleSelector } from "@/features/foods";

interface Props {
  handleAddIngredient: MouseEventHandler;
  scale_amount: number;
  scale_name: string;
  setLocalScale: Function;
  food: Food;
}

const AddFoodIngredient: FC<Props> = ({
  handleAddIngredient,
  scale_amount,
  scale_name,
  setLocalScale,
  food,
}) => {
  if (!food?.food_id) return <>No food_id found</>;

  return (
    <div className="flex flex-col gap-3">
      <ScaleSelector
        food={food}
        scale_amount={scale_amount}
        scale_name={scale_name}
        updateRoute={false}
        setLocalScale={setLocalScale}
      />
      <button
        onClick={handleAddIngredient}
        className="m-auto flex w-fit items-center gap-1 rounded-3xl border bg-green-600 py-1.5 pl-2 pr-4 duration-300 hover:bg-green-500 active:scale-95"
      >
        <span className="material-icons pointer-events-none">add</span>
        <span className="pointer-events-none">Add</span>
      </button>
    </div>
  );
};

export default AddFoodIngredient;
