import { getToday } from "@/utils/dateFormat";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import DaySelector from "@/components/Premium/Plans/DaySelector";
import { selectDietsSlice } from "@/store/slices/dietsSlice";
import { filterObject } from "@/utils/filter";
import { Diet, DietMeal } from "@/types/dietTypes";
import Image from "next/image";

interface Props {
  planData: any;
}

// Atencion aca. Habra que cambiar casi todo probably.
const DayPlan = ({ planData }: Props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { diets } = useSelector(selectDietsSlice);
  const today = getToday();
  const diet: any = Object.entries(
    filterObject(diets, "date_available", today)
  )[0][1];
  const isFree = user?.premium_plan === "free";

  if (Object.keys(diet).length < 1) {
    return <>No diet found</>;
  }
  console.log(Object.values(diet.diet_meals));

  return (
    <>
      <div className="flex max-w-lg flex-col gap-10"></div>
      <div className="flex flex-col items-start justify-center gap-10 rounded-lg bg-white p-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[1vw] sm:px-10">
        <DaySelector />
        <div className="flex w-full max-w-xl flex-col items-center justify-start gap-10">
          <div
            className={`${
              isFree &&
              "z-50 flex h-full w-full max-w-5xl cursor-auto select-none flex-col gap-5"
            } max-w-5xl`}
          >
            {Object.values(diet.diet_meals)
              .sort((a: any, b: any) => Number(a.order) - Number(b.order))
              .map((meal: any) => {
                return (
                  <div
                    key={meal.diet_meal_id}
                    className="min-h-20 flex w-full flex-col gap-2 rounded-md border "
                  >
                    <div className="px-2 py-1">
                      <span className="font-semibold capitalize">
                        {meal.diet_meal_type}
                      </span>
                    </div>
                    <div>
                      {Object.keys(meal.diet_meal_foods).map((food_id) => {
                        const food = meal.diet_meal_foods[food_id];
                        return (
                          <div key={food_id} className="flex">
                            <Image
                              src={food.image}
                              height={150}
                              width={150}
                              alt={food.food_name || ""}
                              className="h-[100px] w-[100px] min-w-[100px] max-w-[100px] rounded-md object-cover"
                            />
                            <div className="px-2 py-1">
                              <span>{food.food_name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default DayPlan;
