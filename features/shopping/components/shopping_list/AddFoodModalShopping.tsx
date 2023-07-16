import {
  Food,
  FoodKind,
  FoodModal,
  selectFoodsSlice,
  setFoodModal,
} from "@/features/foods";
import {
  selectShoppingSlice,
  setIsAddingFoodToShopping,
  setShoppingListFoods,
} from "../../slice";
import { FC, useState } from "react";
import { FilterQueries } from "@/types";
import { postShoppingList } from "../../services";
import { selectAuthSlice } from "@/features/authentication";
import { ShoppingListFood } from "../../types";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Filters from "@/components/Premium/SearchBar/Filters";
import Modal from "@/components/Modal/Modal";
import SearchBarCreate from "@/components/Premium/SearchBar/SearchBarCreate";
import SearchedResults from "@/components/Premium/SearchBar/SearchedResults";

interface Props {}

const AddFoodModalShopping: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { foodsSearched, foodModal } = useSelector(selectFoodsSlice);
  const { shoppingList } = useSelector(selectShoppingSlice);
  const { foods } = shoppingList;
  const [queries, setLocalQueries] = useState<FilterQueries>({
    kind: FoodKind.basic_food,
  });

  if (!user) return <></>;

  const handleOpenFood = (food: Food) => {
    dispatch(setFoodModal(food));
  };

  const handleAddFood = async () => {
    if (!foodModal || !foodModal.id) return;
    try {
      const shoppingListFoods = { ...foods };

      const newShoppingListFoods: ShoppingListFood = {
        category: foodModal.category!,
        id: foodModal.id,
        imageURL: foodModal.imageURL!,
        isCupboard: false,
        name: foodModal.name!,
        scaleAmount: foodModal.scaleAmount,
        scaleName: foodModal.scaleName,
        scales: foodModal.scales,
      };

      const alreadyExists = Object.values(shoppingListFoods).find(
        (food) => food.id === newShoppingListFoods.id
      );

      if (alreadyExists) {
        throw new Error(
          "This food already exists in your shopping list. Please remove it first."
        );
      }

      shoppingListFoods[newShoppingListFoods.id] = newShoppingListFoods;

      const res = await postShoppingList({
        shoppingListFoods,
        user,
      });
      if (res.result !== "success") {
        throw new Error("Error adding food to shopping list");
      }
      dispatch(setShoppingListFoods(shoppingListFoods));
      dispatch(setFoodModal(null));
      handleClose();
      toast.success("Food added to shopping");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleClose = () => {
    dispatch(setIsAddingFoodToShopping(false));
  };

  return (
    <div className="p-2">
      <Modal onClose={handleClose}>
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
            <span>Add new food to</span> <b>Shopping</b>
          </div>
          <div className="h-[85vh] min-h-[20rem] overflow-auto p-4">
            <SearchBarCreate preFetch={false} />
            <Filters
              updateRoute={false}
              queries={queries}
              setLocalQueries={setLocalQueries}
              fixedQueries={{ kind: FoodKind.basic_food }}
            />
            <div className="mt-4">
              <SearchedResults
                searchResult={foodsSearched}
                handleClick={handleOpenFood}
                queries={queries}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddFoodModalShopping;
