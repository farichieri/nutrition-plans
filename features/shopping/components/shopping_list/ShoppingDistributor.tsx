import {
  selectShoppingSlice,
  setCupboardFoods,
  setShoppingListFoods,
} from "@/features/shopping/slice";
import { AppDispatch } from "@/store";
import { FC, useEffect, useState } from "react";
import { postCupboard } from "@/features/shopping/services";
import { selectAuthSlice } from "@/features/authentication";
import { ShoppingListFoods } from "@/features/shopping/types";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const ShoppingDistributor: FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [hasSelecteds, setHasSelecteds] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState(false);
  const { shoppingList, cupboard } = useSelector(selectShoppingSlice);
  const { selecteds: shoppingSelecteds, foods: shoppingFoods } = shoppingList;
  const { foods: cupboardFoods } = cupboard;

  useEffect(() => {
    shoppingSelecteds.length > 0
      ? setHasSelecteds(true)
      : setHasSelecteds(false);
  }, [router, shoppingSelecteds]);

  if (!user) return <></>;

  const handleMoveToCupboard = async () => {
    try {
      if (isLoading || !hasSelecteds) return;
      setIsLoading(true);
      console.log({ shoppingFoods, shoppingSelecteds });
      const newCupboard: ShoppingListFoods = { ...cupboardFoods };
      const newShopping: ShoppingListFoods = { ...shoppingFoods };

      shoppingSelecteds.forEach((id) => {
        newCupboard[id] = newShopping[id];
        // delete newShopping[id];
      });

      const res = await postCupboard({
        cupboard: newCupboard,
        user: user,
      });
      if (res.result === "success") {
        dispatch(setShoppingListFoods(newShopping));
        dispatch(setCupboardFoods(newCupboard));
        toast.success("Moved to cupboard");
      } else {
        throw Error;
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCupboard = () => {};

  return (
    <div className="fixed bottom-16 left-1/2 z-[100] flex min-w-max -translate-x-1/2 items-center justify-center gap-1 rounded-full border bg-white/80 px-1 py-1 dark:bg-black/80">
      <div className="flex min-w-fit items-center gap-2">
        <button
          className={`rounded-3xl border bg-slate-200 px-3 py-2 duration-100 hover:bg-slate-500/20 active:bg-slate-500/50 dark:bg-slate-500 ${
            hasSelecteds ? "opacity-100" : "cursor-not-allowed opacity-50"
          }`}
          onClick={handleMoveToCupboard}
        >
          Add Food
        </button>
        {isLoading && <Spinner customClass="h-5 w-5" />}
      </div>
      <div className="flex min-w-fit items-center gap-2">
        <button
          className={`rounded-3xl border bg-slate-200 px-3 py-2 duration-100 hover:bg-slate-500/20 active:bg-slate-500/50 dark:bg-slate-500 ${
            hasSelecteds ? "opacity-100" : "cursor-not-allowed opacity-50"
          }`}
          onClick={handleMoveToCupboard}
        >
          Remove
        </button>
        {isLoading && <Spinner customClass="h-5 w-5" />}
      </div>
      <div className="flex min-w-fit items-center gap-2">
        <button
          className={`rounded-3xl border bg-slate-200 px-3 py-2 duration-100 hover:bg-slate-500/20 active:bg-slate-500/50 dark:bg-slate-500 ${
            hasSelecteds ? "opacity-100" : "cursor-not-allowed opacity-50"
          }`}
          onClick={handleMoveToCupboard}
        >
          Move Cupboard
        </button>
        {isLoading && <Spinner customClass="h-5 w-5" />}
      </div>
    </div>
  );
};

export default ShoppingDistributor;
