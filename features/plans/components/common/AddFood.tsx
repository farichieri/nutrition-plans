import {
  Food,
  FoodModal,
  selectFoodsSlice,
  setFoodModal,
} from "@/features/foods";
import { addFoodToDiet } from "@/features/plans/slice";
import { DietMeal } from "@/features/plans";
import { FC, MouseEvent, useEffect, useState } from "react";
import { FilterQueries } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import Filters from "@/components/Premium/SearchBar/Filters";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBarCreate from "@/components/Premium/SearchBar/SearchBarCreate";
import SearchedResults from "@/components/Premium/SearchBar/SearchedResults";

interface Props {
  dietMeal: DietMeal;
}

const AddFood: FC<Props> = ({ dietMeal }) => {
  const dispatch = useDispatch();
  const { foodsSearched, foodModal, pages } = useSelector(selectFoodsSlice);
  const [isOpen, setIsOpen] = useState(false);
  const [queries, setLocalQueries] = useState<FilterQueries>({
    plan: dietMeal.planID!,
  });

  const handleOpenFood = (food: Food) => {
    dispatch(setFoodModal(food));
  };

  const handleAddFood = () => {
    if (!dietMeal.id || !foodModal) return;
    dispatch(addFoodToDiet({ food: foodModal, dietMeal }));
    dispatch(setFoodModal(null));
    setIsOpen(false);
  };

  const handleOpen = (event: MouseEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  useEffect(() => {
    setLocalQueries({ plan: dietMeal.planID! });
  }, [isOpen]);

  return (
    <div className="p-2">
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {foodModal && (
            <FoodModal
              food={foodModal}
              handleAdd={handleAddFood}
              handleClose={() => {
                dispatch(setFoodModal(null));
              }}
            />
          )}
          <div className="w-4xl max-w-[95vw]">
            <div className="flex h-14 items-center justify-center gap-1 border-b text-sm font-semibold sm:text-xl">
              <span>Add new food to</span>{" "}
              <b className="text-green-500">{dietMeal.name}</b>
            </div>
            <div className="h-[85vh] min-h-[20rem] overflow-auto p-1">
              <SearchBarCreate queries={queries} preFetch={false} />
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
              <div className="my-2">
                <Pagination
                  pages={pages}
                  queries={queries}
                  setLocalQueries={setLocalQueries}
                  updateRoute={false}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
      <button
        onClick={handleOpen}
        className="mr-auto flex rounded-md border border-green-500 bg-green-500/50 px-4 py-1 duration-100 hover:border-green-500 hover:bg-green-800 active:bg-green-600"
      >
        Add Food
      </button>
    </div>
  );
};

export default AddFood;
