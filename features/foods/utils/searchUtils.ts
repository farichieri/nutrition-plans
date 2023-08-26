import {
  filterByCompatiblePlan,
  filterByNutrientRange,
  filterObject,
  sortFoodsSearched,
} from "@/utils/filter";
import { FoodHitsGroup, FoodHitsGroupArray } from "../types";
import { FilterQueries, FilterSortTypes } from "@/types";

const getFoodsFiltered = (
  foodsToFilter: FoodHitsGroup,
  queries: FilterQueries
): FoodHitsGroupArray => {
  let foodsFiltered: FoodHitsGroup = queries.kind
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

  const foodsSorted: FoodHitsGroupArray = queries.sort
    ? sortFoodsSearched(Object.values(foodsFiltered), queries.sort)
    : sortFoodsSearched(Object.values(foodsFiltered), FilterSortTypes.rating);

  return foodsSorted;
};

const getFoodsSorted = (
  foodsToSort: FoodHitsGroup,
  queries: FilterQueries
): FoodHitsGroupArray => {
  const foodsSorted: FoodHitsGroupArray = queries.sort
    ? sortFoodsSearched(Object.values(foodsToSort), queries.sort)
    : sortFoodsSearched(Object.values(foodsToSort), FilterSortTypes.rating);

  return foodsSorted;
};

export { getFoodsFiltered, getFoodsSorted };
