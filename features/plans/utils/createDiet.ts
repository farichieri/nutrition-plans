import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
  PlanTypes,
} from "@/features/plans";
import { Food, FoodGroup } from "@/features/foods";
import { getDietNutrition, getNutritionValues } from "@/utils";
import { UserMeals, UserMealsArr } from "@/features/meals";
import { PlansEnum } from "@/types";
import { uuidv4 } from "@firebase/util";
import { UserBodyData } from "@/features/authentication";

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
      littersDrunk: 0,
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

export { createDiet, generateDietMeals, getMealCalories, buildDiet };
