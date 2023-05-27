import { Diet, DietMeal } from "@/types/dietTypes";
import { FC, useEffect } from "react";
import { Food } from "@/types/foodTypes";
import { PlansEnum } from "@/types/types";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectPlansSlice, setDietOpened } from "@/store/slices/plansSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Loader/Spinner";
import PlanMeals from "./PlanMeals";

interface Props {
  planID: PlansEnum;
}

const DayPlan: FC<Props> = ({ planID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { date, dietOpened, plans } = useSelector(selectPlansSlice);

  useEffect(() => {
    dispatch(setDietOpened(null));
    const dietFiltered: Diet = plans[planID][date];
    if (dietFiltered) {
      dispatch(setDietOpened(dietFiltered));
    } else {
      dispatch(setDietOpened(null));
    }
  }, [date, plans, planID]);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start gap-10">
        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-green-500">
              restaurant
            </span>
            <span className="text-2xl font-semibold">Meals</span>
          </div>

          <PlanMeals planID={planID} />
        </div>
      </div>
    </>
  );
};
export default DayPlan;
