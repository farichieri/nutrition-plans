import { Food, FoodGroupArray } from "@/types/foodTypes";
import { FilterSortTypes } from "@/types/types";

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
      !obj[val]["compatible_plans"][plan] === filterValue
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

const filterByCaloriesRange = (obj: any, calories_range: string) => {
  const min = Number(calories_range.split("-")[0]);
  const max = Number(calories_range.split("-")[1]);

  return Object.keys(obj).reduce(
    (acc, val) =>
      !(
        obj[val]["nutrients"]["calories"] >= (min || 0) &&
        obj[val]["nutrients"]["calories"] <= (max || Infinity)
      )
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );
};

const sortByHigherCalories = (foodsArray: FoodGroupArray) => {
  return foodsArray.sort(
    (a: Food, b: Food) =>
      Number(b.nutrients.calories) - Number(a.nutrients.calories)
  );
};

const sortByLowerCalories = (foodsArray: FoodGroupArray) => {
  return foodsArray.sort(
    (a: Food, b: Food) =>
      Number(a.nutrients.calories) - Number(b.nutrients.calories)
  );
};

const sortByRating = (foodsArray: FoodGroupArray) => {
  return foodsArray.sort(
    (a: Food, b: Food) => Number(b.num_likes) - Number(a.num_likes)
  );
};

const sortFoodsSearched = (foodsArray: FoodGroupArray, sortBy: string) => {
  switch (sortBy) {
    case FilterSortTypes.higher_calories:
      return sortByHigherCalories(foodsArray);
    case FilterSortTypes.lower_calories:
      return sortByLowerCalories(foodsArray);
    default:
      return sortByRating(foodsArray);
  }
};

export {
  filterObject,
  filterByCompatiblePlan,
  filterByCaloriesRange,
  sortFoodsSearched,
};
