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

  foodsFiltered = queries.caloriesRange
    ? filterByNutrientRange(foodsFiltered, queries.caloriesRange, "calories")
    : foodsFiltered;
  foodsFiltered = queries.proteinsRange
    ? filterByNutrientRange(foodsFiltered, queries.proteinsRange, "proteins")
    : foodsFiltered;
  foodsFiltered = queries.carbsRange
    ? filterByNutrientRange(foodsFiltered, queries.carbsRange, "carbohydrates")
    : foodsFiltered;
  foodsFiltered = queries.fatsRange
    ? filterByNutrientRange(foodsFiltered, queries.fatsRange, "fats")
    : foodsFiltered;

  const foodsSorted: FoodGroupArray = queries.sort
    ? sortFoodsSearched(Object.values(foodsFiltered), queries.sort)
    : sortFoodsSearched(Object.values(foodsFiltered), FilterSortTypes.rating);

  return foodsSorted;
};

const getFoodsSorted = (
  foodsToSort: FoodGroup,
  queries: FilterQueries
): FoodGroupArray => {
  const foodsSorted: FoodGroupArray = queries.sort
    ? sortFoodsSearched(Object.values(foodsToSort), queries.sort)
    : sortFoodsSearched(Object.values(foodsToSort), FilterSortTypes.rating);

  return foodsSorted;
};

export { getFoodsFiltered, getFoodsSorted };
