import {
  ShoppingListFood,
  ShoppingListFoods,
  buildCupboardList,
  getCupboard,
  selectShoppingSlice,
  setCupboardFoods,
  setCupboardSelecteds,
} from "@/features/shopping";
import { db } from "@/services/firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import List from "../shopping_list/List";

interface Props {}

const CupboardList: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const { cupboard } = useSelector(selectShoppingSlice);
  const { selecteds, foods: cupboardFoods } = cupboard;

  const handleSelected = ({ food }: { food: ShoppingListFood }) => {
    if (selecteds.includes(food.id)) {
      dispatch(setCupboardSelecteds(selecteds.filter((id) => id !== food.id)));
    } else {
      dispatch(setCupboardSelecteds([...selecteds, food.id]));
    }
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
  }, [router]);

  useEffect(() => {
    // Listen to database changes
    if (user) {
      const docRef = doc(db, "users", user.id, "cupboard", "uniqueCupboard");
      onSnapshot(docRef, (doc) => {
        const data = (doc.data() as ShoppingListFoods) || {};
        dispatch(setCupboardFoods(data));
      });
    }
  }, [onSnapshot]);

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
