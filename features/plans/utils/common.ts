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
  type: PlanTypes,
  userBodyData: UserBodyData
) => {
  const dietMeals: DietMealGroup = {};
  meals.forEach((meal) => {
    if (!meal.id) return;
    dietMeals[meal.id as keyof DietMeal] = meal;
  });
  const nutrition = getDietNutrition(dietMeals);
  const { waterRecommendedInLts } = userBodyData;

  const diet: Diet = {
    ...NewDiet,
    dateAvailable: null,
    dateCreated: null,
    description: null,
    id: null,
    meals: dietMeals,
    nameLowerCase: null,
    name: null,
    nutrients: nutrition,
    date: null,
    planID: plan_id,
    type: type,
    water: {
      drunk: false,
      litterDrunk: 0,
      littersToDrink: waterRecommendedInLts,
    },
  };

  return diet;
};

const generateDietMeals = (userMealsArr: UserMealsArr): DietMealGroup => {
  const meals: DietMealGroup = {};
  userMealsArr.map((meal) => {
    const uuid = uuidv4();

    const newDietMeal: DietMeal = {
      complexity: meal.complexity,
      isCookeable: meal.isCookeable,
      foods: {},
      id: uuid,
      name: meal.name,
      order: meal.order,
      size: meal.size,
      time: meal.time,
      mealID: meal.id,
      dietID: null,
    };
    if (newDietMeal.id) {
      meals[newDietMeal.id] = newDietMeal;
    }
  });
  return meals;
};

const getMealCalories = (dietMealFoods: FoodGroup): number => {
  return Object.values(dietMealFoods).reduce((acc: number, curr: Food) => {
    const nutrientsUpdated = getNutritionValues(
      curr,
      curr.scaleAmount,
      curr.scaleName
    );
    return acc + Number(nutrientsUpdated.calories);
  }, 0);
};

const createDiet = (
  meals: UserMeals,
  planID: PlansEnum,
  type: PlanTypes,
  userBodyData: UserBodyData
): Diet => {
  const mealsGenerated = generateDietMeals(Object.values(meals));
  const diet = buildDiet(
    Object.values(mealsGenerated),
    planID,
    type,
    userBodyData
  );
  return diet;
};

const isAllEaten = (dietMealFoodsArr: FoodGroupArray) => {
  let result = true;

  if (dietMealFoodsArr.length < 1) result = false;

  dietMealFoodsArr.forEach((food) => {
    if (food.isEaten === false) result = false;
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
