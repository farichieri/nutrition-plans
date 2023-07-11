import {
  selectShoppingSlice,
  setCupboardFoods,
  setShoppingListFoods,
} from "@/features/shopping/slice";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ShoppingListFoods } from "@/features/shopping/types";

interface Props {}

const ShoppingDistributor: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { shoppingList, cupboard } = useSelector(selectShoppingSlice);
  const { selecteds: shoppingSelecteds, foods: shoppingFoods } = shoppingList;
  const { selecteds: cupboardSelecteds, foods: cupboardFoods } = cupboard;
  const [hasSelecteds, setHasSelecteds] = useState(false);
  const isShoppingRoute = router.asPath.includes("shopping");
  const isCupboardRoute = router.asPath.includes("cupboard");

  useEffect(() => {
    if (isShoppingRoute) {
      if (shoppingSelecteds.length > 0) {
        setHasSelecteds(true);
      } else {
        setHasSelecteds(false);
      }
    } else if (isCupboardRoute) {
      if (cupboardSelecteds.length > 0) {
        setHasSelecteds(true);
      } else {
        setHasSelecteds(false);
      }
    }
  }, [router, shoppingSelecteds, cupboardSelecteds]);

  const handleMoveToCupboard = () => {
    console.log({ shoppingFoods, shoppingSelecteds });
    const newCupboard: ShoppingListFoods = { ...cupboardFoods };
    const newShopping: ShoppingListFoods = { ...shoppingFoods };

    shoppingSelecteds.forEach((id) => {
      newCupboard[id] = newShopping[id];
      delete newShopping[id];
    });
    dispatch(setShoppingListFoods(newShopping));
    dispatch(setCupboardFoods(newCupboard));
  };

  return (
    <div>
      <button
        className={`rounded-3xl border px-3 py-2 duration-100 hover:bg-slate-500/20 active:bg-slate-500/50 ${
          hasSelecteds ? "opacity-100" : "cursor-not-allowed opacity-50"
        }`}
        onClick={handleMoveToCupboard}
      >
        Move to Cupboard
      </button>
    </div>
  );
};

export default ShoppingDistributor;
