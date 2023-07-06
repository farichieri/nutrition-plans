import { FC, MouseEventHandler } from "react";
import { Food, ScaleSelector } from "@/features/foods";
import { MdAdd } from "react-icons/md";

interface Props {
  handleAddIngredient: MouseEventHandler;
  scaleAmount: number;
  scaleName: string;
  setLocalScale: Function;
  food: Food;
}

const AddFoodIngredient: FC<Props> = ({
  handleAddIngredient,
  scaleAmount,
  scaleName,
  setLocalScale,
  food,
}) => {
  if (!food?.id) return <>No food id found</>;

  return (
    <div className="flex flex-col">
      <ScaleSelector
        food={food}
        scaleAmount={scaleAmount}
        scaleName={scaleName}
        updateRoute={false}
        setLocalScale={setLocalScale}
      />
      <button
        onClick={handleAddIngredient}
        className="mx-auto flex w-fit items-center gap-1 rounded-3xl border bg-green-600 py-1.5 pl-2 pr-4 duration-300 hover:bg-green-500 active:scale-95"
      >
        <MdAdd className="pointer-events-none h-6 w-6" />
        <span className="pointer-events-none">Add</span>
      </button>
    </div>
  );
};

export default AddFoodIngredient;
