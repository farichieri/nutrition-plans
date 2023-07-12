import {
  ShoppingListFood,
  ShoppingListFoods,
  buildCupboardList,
  buildShoppingList,
  getCupboard,
  selectShoppingSlice,
  setCupboardFoods,
  setCupboardSelecteds,
  setShoppingSelecteds,
} from "@/features/shopping";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import List from "../shopping_list/List";
import { selectAuthSlice } from "@/features/authentication";

interface Props {}

const CupboardList: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();
  const { shoppingList, cupboard } = useSelector(selectShoppingSlice);
  const { selecteds, foods: shoppingListFoods } = shoppingList;
  const { foods: cupboardFoods } = cupboard;

  const handleSelected = ({ food }: { food: ShoppingListFood }) => {
    // if (selecteds.includes(food.id)) {
    //   dispatch(setShoppingSelecteds(selecteds.filter((id) => id !== food.id)));
    // } else {
    //   dispatch(setShoppingSelecteds([...selecteds, food.id]));
    // }
  };

  const fetchCupboard = async () => {
    if (!user) return;
    const res = await getCupboard({ userID: user.id });
    if (res.result === "success") {
      console.log("res.data", res.data);
      dispatch(setCupboardFoods(res.data));
    }
  };

  useEffect(() => {
    dispatch(setCupboardSelecteds([]));
    fetchCupboard();
  }, []);

  const list = buildCupboardList({ cupboardFoods });

  const firstSlice = Object.fromEntries(Object.entries(list).slice(0, 9));
  const secondSlice = Object.fromEntries(Object.entries(list).slice(9));

  return (
    <div className="flex flex-col gap-1">
      {Object.values(list).length > 1 && (
        <div className="grid w-full sm:grid-cols-fluid_lg md:gap-5">
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

export default CupboardList;
