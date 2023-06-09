import {
  Food,
  IngredientModal,
  selectFoodsSlice,
  setFoodModal,
} from "@/features/foods";
import { addFoodToDiet } from "../../slice";
import { DietMeal } from "../../types";
import { FC, useState } from "react";
import { FilterQueries } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import Filters from "@/components/Premium/SearchBar/Filters";
import Modal from "@/components/Modal/Modal";
import SearchBarCreate from "@/components/Premium/SearchBar/SearchBarCreate";
import SearchedResults from "@/components/Premium/SearchBar/SearchedResults";

interface Props {
  dietMeal: DietMeal;
}

const AddFood: FC<Props> = ({ dietMeal }) => {
  const dispatch = useDispatch();
  const { foodsSearched, foodModal } = useSelector(selectFoodsSlice);
  const [isOpen, setIsOpen] = useState(false);
  const [queries, setLocalQueries] = useState<FilterQueries>({});

  const handleOpenFood = (food: Food) => {
    dispatch(setFoodModal(food));
  };

  const handleAddFood = () => {
    if (!dietMeal.diet_meal_id || !foodModal) return;
    dispatch(addFoodToDiet({ food: foodModal, dietMeal }));
    dispatch(setFoodModal(null));
    setIsOpen(false);
  };

  return (
    <div className="border-t p-2">
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {foodModal && (
            <IngredientModal
              food={foodModal}
              handleAdd={handleAddFood}
              handleClose={() => {
                dispatch(setFoodModal(null));
              }}
            />
          )}
          <div className="max-h-[90vh] min-h-[20rem] w-xl max-w-[95vw] overflow-auto p-4">
            <span className="text-xl font-semibold">
              Add new food to <b>{dietMeal.diet_meal_name}</b>
            </span>
            <SearchBarCreate preFetch={false} />
            <Filters
              updateRoute={false}
              queries={queries}
              setLocalQueries={setLocalQueries}
            />
            <div className="mt-4">
              <SearchedResults
                searchResult={foodsSearched}
                handleClick={handleOpenFood}
                queries={queries}
              />
            </div>
          </div>
        </Modal>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="m-auto flex rounded-3xl border px-4 py-1 duration-100 hover:border-green-500 hover:bg-green-800 active:bg-green-600"
      >
        Add Food
      </button>
    </div>
  );
};

export default AddFood;
