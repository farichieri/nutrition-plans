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
import { FC } from "react";
import { FilterQueries, FilterSortTypes } from "@/types";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Loader/Spinner";
import FoodCard from "./FoodCard";

interface Props {
  queries: FilterQueries;
}

const FoodsSearched: FC<Props> = ({ queries }) => {
  const { foodsSearched, isSearchingFoods } = useSelector(selectFoodsSlice);
  const noData = Object.values(foodsSearched).length === 0;

  if (noData && isSearchingFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }
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
    <div className="sm:grid-cols grid max-w-screen-2xl select-none grid-cols-fluid gap-4 px-4 sm:px-0">
      {foods.map((food: Food) => {
        return <FoodCard food={food} key={food.food_id} />;
      })}
    </div>
  );
};

export default FoodsSearched;
