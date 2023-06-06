import { MealComplexities } from "@/features/meals";
import { getDietFoods } from "../../../utils/foodsHelpers";
import { getDietNutrition } from "@/utils/nutritionHelpers";
import { PlansEnum } from "@/types";
import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
} from "@/features/plans";

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

const buildDiet = (meals: DietMealGroupArr, planID: PlansEnum) => {
  const dietMeals: DietMealGroup = {};
  meals.forEach((m) => {
    if (!m.diet_meal_id) return;
    dietMeals[m.diet_meal_id as keyof DietMeal] = m;
  });
  const foods = getDietFoods(dietMeals);
  const nutrition = getDietNutrition(foods);

  const diet: Diet = {
    ...NewDiet,
    date_available: null,
    date_created: null,
    diet_description: null,
    diet_id: null,
    diet_meals: dietMeals,
    diet_name_lowercase: null,
    diet_name: null,
    diet_nutrients: nutrition,
    plan_date: null,
    plan_id: planID,
  };

  return diet;
};

export { matchComplexity, maxComplexity, buildDiet };
