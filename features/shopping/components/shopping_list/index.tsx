import {
  buildShoppingList,
  selectShoppingSlice,
  setShoppingSelecteds,
  ShoppingListFood,
  ShoppingListFoods,
  ShoppingListT,
} from "@/features/shopping";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import List from "./List";

interface Props {}

const ShoppingList: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { shoppingList, cupboard } = useSelector(selectShoppingSlice);
  const { selecteds, foods: shoppingListFoods } = shoppingList;
  const { foods: cupboardFoods } = cupboard;
  const [list, setList] = useState<ShoppingListT>({});

  const handleSelected = ({ food }: { food: ShoppingListFood }) => {
    if (selecteds.includes(food.id)) {
      dispatch(setShoppingSelecteds(selecteds.filter((id) => id !== food.id)));
    } else {
      dispatch(setShoppingSelecteds([...selecteds, food.id]));
    }
  };

  useEffect(() => {
    dispatch(setShoppingSelecteds([]));
  }, [router]);

  useEffect(() => {
    setList(buildShoppingList({ shoppingListFoods, cupboardFoods }));
  }, [shoppingListFoods, cupboardFoods]);

  const firstSlice = Object.fromEntries(Object.entries(list).slice(0, 9));
  const secondSlice = Object.fromEntries(Object.entries(list).slice(9));

  return (
    <div className="flex flex-col gap-1">
      {Object.values(list).length > 1 && (
        <div className="grid w-full sm:grid-cols-fluid_lg md:gap-x-5">
          <div className="flex w-full flex-col gap-1">
            <List
              list={firstSlice}
              handleSelected={handleSelected}
              selecteds={selecteds}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <List
              list={secondSlice}
              handleSelected={handleSelected}
              selecteds={selecteds}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
