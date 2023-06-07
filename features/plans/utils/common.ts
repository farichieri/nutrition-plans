import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
} from "@/features/plans";
import { getDietNutrition } from "@/utils/nutritionHelpers";
import { MealComplexities, UserMealsArr } from "@/features/meals";
import { PlansEnum } from "@/types";
import { FoodGroup } from "@/features/foods";
import { uuidv4 } from "@firebase/util";

const getDietFoods = (diet_meals: DietMealGroup): FoodGroup => {
  let result: FoodGroup = {};
  Object.keys(diet_meals).map((meal_id) => {
    const diet_meal = diet_meals[meal_id];
    const foods = diet_meal.diet_meal_foods;
    Object.keys(foods).map((food_id, index) => {
      result[meal_id + "_" + index] = foods[food_id];
    });
  });
  return result;
};

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
  meals.forEach((meal) => {
    if (!meal.diet_meal_id) return;
    dietMeals[meal.diet_meal_id as keyof DietMeal] = meal;
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

const generateDietMeals = (userMealsArr: UserMealsArr): DietMealGroup => {
  const diet_meals: DietMealGroup = {};
  userMealsArr.map((meal) => {
    const uuid = uuidv4();

    const newDietMeal: DietMeal = {
      complexity: meal.complexity,
      cook: meal.cook,
      diet_meal_foods: {},
      diet_meal_id: uuid,
      diet_meal_name: meal.name,
      order: meal.order,
      size: meal.size,
      time: meal.time,
      user_meal_id: meal.id,
    };
    if (newDietMeal.diet_meal_id) {
      diet_meals[newDietMeal.diet_meal_id] = newDietMeal;
    }
  });
  return diet_meals;
};

export {
  matchComplexity,
  maxComplexity,
  buildDiet,
  getDietFoods,
  generateDietMeals,
};
