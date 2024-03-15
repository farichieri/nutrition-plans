import { FoodGroupArray } from "@/features/foods";
import { MealComplexities } from "@/features/meals";

const matchComplexity = (complexity: number, toEval: number): boolean => {
  switch (toEval) {
    case MealComplexities.very_simple:
      return complexity >= 1 && complexity < 2;
    case MealComplexities.simple:
      return complexity >= 2 && complexity < 3;
    case MealComplexities.moderate:
      return complexity >= 3 && complexity < 4;
    case MealComplexities.complex:
      return complexity >= 4;
    default:
      return false;
  }
};

const maxComplexity = (toEval: number): number => {
  switch (toEval) {
    case MealComplexities.very_simple:
      return MealComplexities.simple;
    case MealComplexities.simple:
      return MealComplexities.moderate;
    case MealComplexities.moderate:
      return MealComplexities.complex;
    case MealComplexities.complex:
      return Infinity;
    default:
      return Infinity;
  }
};

const isAllEaten = (dietMealFoodsArr: FoodGroupArray) => {
  let result = true;

  if (dietMealFoodsArr.length < 1) result = false;

  dietMealFoodsArr.forEach((food) => {
    if (food.isEaten === false) result = false;
  });

  return result;
};

export { matchComplexity, maxComplexity, isAllEaten };
