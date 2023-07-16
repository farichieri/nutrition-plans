import {
  selectShoppingSlice,
  setCupboardFoods,
  setIsAddingFoodToShopping,
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
import { MdSearch } from "react-icons/md";

interface Props {}

const buttonClass =
  "flex min-w-fit items-center gap-2 rounded-3xl border bg-slate-200 px-3 py-2 duration-100 hover:bg-slate-500/20 active:bg-slate-500/50 dark:bg-slate-500";

const ShoppingDistributor: FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [hasSelecteds, setHasSelecteds] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [isLoadingMove, setIsLoadingMove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const { shoppingList, cupboard } = useSelector(selectShoppingSlice);
  const { selecteds: shoppingSelecteds, foods: shoppingFoods } = shoppingList;
  const { selecteds: cupboardSelecteds, foods: cupboardFoods } = cupboard;
  const isShoppingPage = router.pathname.includes("shopping");
  const isCupboardPage = router.pathname.includes("cupboard");

  useEffect(() => {
    shoppingSelecteds.length > 0
      ? setHasSelecteds(true)
      : setHasSelecteds(false);
  }, [router, shoppingSelecteds]);

  if (!user) return <></>;

  const handleMoveToCupboard = async () => {
    try {
      if (isLoadingMove || !hasSelecteds) return;
      setIsLoadingMove(true);
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
      setIsLoadingMove(false);
    }
  };

  const removeFromCupboard = async () => {
    if (!isCupboardPage) return;
    try {
      if (isLoadingRemove || !hasSelecteds) return;
      setIsLoadingRemove(true);
      const newCupboard: ShoppingListFoods = { ...cupboardFoods };

      cupboardSelecteds.forEach((id) => {
        delete newCupboard[id];
      });

      const res = await postCupboard({
        cupboard: newCupboard,
        user: user,
      });

      if (res.result === "success") {
        dispatch(setCupboardFoods(newCupboard));
        toast.success("Removed from cupboard");
      } else {
        throw Error;
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoadingRemove(false);
    }
  };

  const selectedsLength = shoppingSelecteds.length;

  return (
    <div className="fixed bottom-16 left-1/2 z-[100] flex min-w-max -translate-x-1/2 items-center justify-center gap-1 rounded-full border bg-white/80 px-1 py-1 dark:bg-black/80 md:bottom-4">
      <div className="flex min-w-fit items-center gap-2">
        <button
          className={
            buttonClass +
            ` border-green-800 !bg-green-500 opacity-50 hover:opacity-100 `
          }
          onClick={() => dispatch(setIsAddingFoodToShopping(true))}
        >
          <MdSearch className="h-5 w-5" />
          Add Food
        </button>
      </div>
      <div className="flex min-w-fit items-center gap-2">
        <button
          className={
            buttonClass +
            ` ${hasSelecteds ? "opacity-100" : "cursor-not-allowed opacity-50"}`
          }
          onClick={removeFromCupboard}
        >
          Remove
          {selectedsLength > 0 && (
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm font-semibold`}
            >
              {selectedsLength}
            </span>
          )}
          {isLoadingRemove && <Spinner customClass="h-5 w-5" />}
        </button>
      </div>
      <div className="flex min-w-fit items-center gap-2">
        <button
          className={
            buttonClass +
            ` ${hasSelecteds ? "opacity-100" : "cursor-not-allowed opacity-50"}`
          }
          onClick={handleMoveToCupboard}
        >
          {isShoppingPage ? "Move to cupboard" : "Move to shopping"}
          {selectedsLength > 0 && (
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm font-semibold`}
            >
              {selectedsLength}
            </span>
          )}
          {isLoadingMove && <Spinner customClass="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default ShoppingDistributor;
