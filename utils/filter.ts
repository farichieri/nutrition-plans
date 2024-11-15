import {
  Food,
  FoodGroupArray,
  FoodHit,
  FoodHitsGroupArray,
} from "@/features/foods";
import { FilterSortTypes } from "@/types";

const filterObject = (obj: any, filter: string, filterValue: string) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val][filter].includes(filterValue)
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

const filterByCompatiblePlan = (obj: any, plan: string, filterValue: boolean) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val]["compatiblePlans"][plan] === filterValue
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

const filterByNutrientRange = (
  foods: any,
  nutrientRange: string,
  nutrient: string
) => {
  const min = Number(nutrientRange.split("-")[0]);
  const max = Number(nutrientRange.split("-")[1]);

  return Object.keys(foods).reduce(
    (acc, food) =>
      !(
        foods[food]["nutrients"][nutrient] >= (min || 0) &&
        foods[food]["nutrients"][nutrient] <= (max || Infinity)
      )
        ? acc
        : {
            ...acc,
            [food]: foods[food],
          },
    {}
  );
};

const sortByHigherCalories = (foodsArray: FoodHitsGroupArray) => {
  return foodsArray.sort(
    (a: FoodHit, b: FoodHit) =>
      Number(b.nutrients.calories) - Number(a.nutrients.calories)
  );
};

const sortByLowerCalories = (foodsArray: FoodHitsGroupArray) => {
  return foodsArray.sort(
    (a: FoodHit, b: FoodHit) =>
      Number(a.nutrients.calories) - Number(b.nutrients.calories)
  );
};

const sortByRating = (foodsArray: FoodHitsGroupArray) => {
  return foodsArray.sort(
    (a: FoodHit, b: FoodHit) => Number(b.likes) - Number(a.likes)
  );
};

const sortFoodsSearched = (foodsArray: FoodHitsGroupArray, sortBy: string) => {
  switch (sortBy) {
    case FilterSortTypes.higherCalories:
      return sortByHigherCalories(foodsArray);
    case FilterSortTypes.lowerCalories:
      return sortByLowerCalories(foodsArray);
    default:
      return sortByRating(foodsArray);
  }
};

const reorderArr = (list: any[], startI: number, endI: number): any[] => {
  const result = [...list];
  const [removed] = result.splice(startI, 1);
  result.splice(endI, 0, removed);
  return result;
};

const removeFromList = (list: any[], index: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list: any[], index: number, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

export {
  filterObject,
  filterByCompatiblePlan,
  filterByNutrientRange,
  sortFoodsSearched,
  reorderArr,
  removeFromList,
  addToList,
};
