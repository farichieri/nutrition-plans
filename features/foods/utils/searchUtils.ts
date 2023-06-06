import {
  filterByCompatiblePlan,
  filterByNutrientRange,
  filterObject,
  sortFoodsSearched,
} from "@/utils/filter";
import { FoodGroup, FoodGroupArray } from "../types";
import { FilterQueries, FilterSortTypes } from "@/types";

const getFoodsFiltered = (
  foodsToFilter: FoodGroup,
  queries: FilterQueries
): FoodGroupArray => {
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
    ? filterByNutrientRange(foodsFiltered, queries.carbs_range, "carbohydrates")
    : foodsFiltered;
  foodsFiltered = queries.fats_range
    ? filterByNutrientRange(foodsFiltered, queries.fats_range, "fats")
    : foodsFiltered;

  const foodsSorted: FoodGroupArray = queries.sort
    ? sortFoodsSearched(Object.values(foodsFiltered), queries.sort)
    : sortFoodsSearched(Object.values(foodsFiltered), FilterSortTypes.rating);

  return foodsSorted;
};

export { getFoodsFiltered };
