import { selectFoodsSlice } from "@/features/foods";
import { FC, MouseEventHandler } from "react";
import { useSelector } from "react-redux";

interface Props {
  handleAddIngredient: MouseEventHandler;
}

const AddFoodIngredient: FC<Props> = ({ handleAddIngredient }) => {
  const { foodOpened } = useSelector(selectFoodsSlice);
  const food = foodOpened.food;

  if (!food?.food_id) return <>No food_id found</>;

  return (
    <div>
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
