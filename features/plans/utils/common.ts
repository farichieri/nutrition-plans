import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
  PlanTypes,
} from "@/features/plans";
import { Food, FoodGroup, FoodGroupArray } from "@/features/foods";
import { getDietNutrition, getNutritionValues } from "@/utils";
import { MealComplexities, UserMeals, UserMealsArr } from "@/features/meals";
import { PlansEnum } from "@/types";
import { uuidv4 } from "@firebase/util";
import { UserBodyData } from "@/features/authentication";

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

const buildDiet = (
  meals: DietMealGroupArr,
  plan_id: PlansEnum,
  plan_type: PlanTypes,
  userBodyData: UserBodyData
) => {
  const dietMeals: DietMealGroup = {};
  meals.forEach((meal) => {
    if (!meal.diet_meal_id) return;
    dietMeals[meal.diet_meal_id as keyof DietMeal] = meal;
  });
  const nutrition = getDietNutrition(dietMeals);
  const { water_lts_recommended } = userBodyData;

  const diet: Diet = {
    ...NewDiet,
    date_available: null,
    date_created: null,
    diet_description: null,
    diet_id: null,
    diet_meals: dietMeals,
    diet_name_lowercase: null,
    diet_name: null,
    diet_nutrition: nutrition,
    plan_date: null,
    plan_id: plan_id,
    plan_type: plan_type,
    diet_water: {
      drunk: false,
      litters_drunk: 0,
      litters_to_drink: water_lts_recommended,
    },
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
      diet_id: null,
    };
    if (newDietMeal.diet_meal_id) {
      diet_meals[newDietMeal.diet_meal_id] = newDietMeal;
    }
  });
  return diet_meals;
};

const getMealCalories = (dietMealFoods: FoodGroup): number => {
  return Object.values(dietMealFoods).reduce((acc: number, curr: Food) => {
    const nutrientsUpdated = getNutritionValues(
      curr,
      curr.scale_amount,
      curr.scale_name
    );
    return acc + Number(nutrientsUpdated.calories);
  }, 0);
};

const createDiet = (
  meals: UserMeals,
  planID: PlansEnum,
  plan_type: PlanTypes,
  userBodyData: UserBodyData
): Diet => {
  const mealsGenerated = generateDietMeals(Object.values(meals));
  const diet = buildDiet(
    Object.values(mealsGenerated),
    planID,
    plan_type,
    userBodyData
  );
  return diet;
};

const isAllEaten = (dietMealFoodsArr: FoodGroupArray) => {
  let result = true;

  if (dietMealFoodsArr.length < 1) result = false;

  dietMealFoodsArr.forEach((food) => {
    if (food.eaten === false) result = false;
  });

  return result;
};

export {
  matchComplexity,
  maxComplexity,
  buildDiet,
  generateDietMeals,
  getMealCalories,
  createDiet,
  isAllEaten,
};
