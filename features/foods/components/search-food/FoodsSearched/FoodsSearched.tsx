import {
  Food,
  FoodGroup,
  FoodGroupArray,
  selectFoodsSlice,
} from "@/features/foods";
import {
  filterByNutrientRange,
  filterByCompatiblePlan,
  filterObject,
  sortFoodsSearched,
} from "@/utils/filter";
import { AppRoutes } from "@/utils/routes";
import { FC } from "react";
import { FilterQueries, FilterSortTypes } from "@/types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  queries: FilterQueries;
}

const FoodsSearched: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const { foodsSearched, isSearchingFoods, myFoodsSearched } =
    useSelector(selectFoodsSlice);

  const foodsToFilter =
    router.pathname === AppRoutes.search_my_creations
      ? myFoodsSearched
      : foodsSearched;

  const noData = Object.values(foodsToFilter).length === 0;

  if (isSearchingFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }
  if (noData) {
    return <div>No Foods found with that name</div>;
  }

  const getFoodsFiltered = (foodsToFilter: FoodGroup): FoodGroupArray => {
    let foodsFiltered: FoodGroup = queries.kind
      ? filterObject(foodsToFilter, "kind", queries.kind)
      : foodsToFilter;

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

  const foods = getFoodsFiltered(foodsToFilter);

  return (
    <div className="grid max-w-screen-2xl select-none grid-cols-fluid_fr items-start justify-center gap-4 px-4 sm:px-0 lg:grid-cols-fluid lg:justify-start">
      {foods.map((food: Food) => {
        return <FoodCard food={food} key={food.food_id} />;
      })}
    </div>
  );
};

export default FoodsSearched;
