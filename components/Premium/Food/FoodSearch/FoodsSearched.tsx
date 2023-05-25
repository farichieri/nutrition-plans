import {
  filterByNutrientRange,
  filterByCompatiblePlan,
  filterObject,
  sortFoodsSearched,
} from "@/utils/filter";
import { FC } from "react";
import { FilterQueries, FilterSortTypes } from "@/types/types";
import { Food, FoodGroup, FoodGroupArray, FoodKind } from "@/types/foodTypes";
import { Meal } from "@/types/mealTypes";
import { selectFoodsSlice } from "@/store/slices/foodsSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

// interface MealProps {
//   meal: Meal;
// }

// const Meal: FC<MealProps> = ({ meal }) => {
//   const mealFoods = meal.ingredients;
//   return (
//     <div className="flex h-56 w-full cursor-pointer flex-col items-start border">
//       <div className="flex w-full flex-col divide-y">
//         {Object.keys(mealFoods).map((food_id) => {
//           const food = mealFoods[food_id].food;
//           return (
//             <div key={food_id} className="flex h-full w-full gap-2 ">
//               <span className="relative h-auto w-full basis-1/2 ">
//                 <Image
//                   src={food.image}
//                   fill
//                   className="object-cover"
//                   alt={food.food_name || ""}
//                 />
//               </span>
//               <div className="flex w-full basis-1/2 flex-col">
//                 <span className="text-lg font-semibold capitalize">
//                   {food.food_name}
//                 </span>
//                 <span className="text-xs opacity-50">
//                   {food.food_description}
//                 </span>
//                 <span className="text-xs text-green-500">{food.kind}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

interface Props {
  queries: FilterQueries;
}

const FoodsSearched: FC<Props> = ({ queries }) => {
  const { foodsSearched } = useSelector(selectFoodsSlice);
  const noData = Object.values(foodsSearched).length === 0;

  if (noData) {
    return <div>No Foods found with that name</div>;
  }

  const getFoodsFiltered = () => {
    let foodsFiltered: FoodGroup = queries.kind
      ? filterObject(foodsSearched, "kind", queries.kind)
      : foodsSearched;

    foodsFiltered = queries.plan
      ? filterByCompatiblePlan(foodsFiltered, queries.plan, true)
      : foodsFiltered;

    foodsFiltered = queries.calories_range
      ? filterByNutrientRange(foodsFiltered, queries.calories_range, "calories")
      : foodsFiltered;
    foodsFiltered = queries.proteins_range
      ? filterByNutrientRange(foodsFiltered, queries.proteins_range, "proteins")
      : foodsFiltered;
    foodsFiltered = queries.carbs_range
      ? filterByNutrientRange(
          foodsFiltered,
          queries.carbs_range,
          "carbohydrates"
        )
      : foodsFiltered;
    foodsFiltered = queries.fats_range
      ? filterByNutrientRange(foodsFiltered, queries.fats_range, "fats")
      : foodsFiltered;

    const foodsSorted: FoodGroupArray = queries.sort
      ? sortFoodsSearched(Object.values(foodsFiltered), queries.sort)
      : sortFoodsSearched(Object.values(foodsFiltered), FilterSortTypes.rating);

    return foodsSorted;
  };

  const foods = getFoodsFiltered();

  return (
    <div className="grid max-w-screen-2xl select-none grid-cols-fluid gap-4 px-4 sm:grid-cols sm:px-0">
      {foods.map((food: Food) => {
        return (
          <Link
            href={`/app/food/${food.food_id}`}
            key={food.food_id}
            className="flex flex-col items-center overflow-auto rounded-lg border bg-white shadow-sm shadow-[#00000028] duration-300 hover:border-black/20 hover:shadow-xl dark:bg-slate-400/10 dark:hover:border-white/50 sm:max-w-xs"
          >
            <span className="relative h-56 w-full">
              <Image
                src={food.image}
                alt={`${food.food_name}`}
                fill
                className="object-cover"
              />
            </span>
            <div className="flex w-full flex-col break-words p-2">
              <span className="text-center text-lg font-semibold">
                {food.food_name}
              </span>
              <div className="flex w-full justify-between">
                <span>Calories:</span>
                <span>{food.nutrients.calories}</span>
              </div>
              <div className="flex w-full justify-between text-[var(--carbs-color)]">
                <span>Carbs:</span>
                <span>{food.nutrients.carbohydrates}</span>
              </div>
              <div className="flex w-full justify-between text-[var(--fats-color)]">
                <span>Fats:</span>
                <span>{food.nutrients.fats}</span>
              </div>
              <div className="flex w-full justify-between text-[var(--prots-color)]">
                <span>Proteins:</span>
                <span>{food.nutrients.proteins}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FoodsSearched;
