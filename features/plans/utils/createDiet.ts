import {
  Diet,
  DietMeal,
  DietMealGroup,
  DietMealGroupArr,
  NewDiet,
  PlanTypes,
} from "@/features/plans";
import { getDietNutrition, getToday } from "@/utils";
import { PlansEnum } from "@/types";
import { User, getNutritionTargets } from "@/features/authentication";
import { UserMeals, UserMealsArr } from "@/features/meals";
import { uuidv4 } from "@firebase/util";

const buildDiet = (
  meals: DietMealGroupArr,
  plan_id: PlansEnum,
  type: PlanTypes,
  user: User
) => {
  const dietMeals: DietMealGroup = {};
  meals.forEach((meal) => {
    if (!meal.id) return;
    dietMeals[meal.id as keyof DietMeal] = meal;
  });
  const nutrition = getDietNutrition(dietMeals);
  const { bodyData } = user;
  const { waterRecommendedInLts } = bodyData;
  const calories = user.nutritionTargets.calories;
  const nutritionTargets = getNutritionTargets({
    calories: calories,
    planSelected: plan_id,
  });

  const diet: Diet = {
    ...NewDiet,
    date: null,
    dateCreated: null,
    description: null,
    hideNutritionTargetsDiff: false,
    id: null,
    meals: dietMeals,
    name: null,
    nutrients: nutrition,
    nutritionTargets: nutritionTargets,
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

const generateDietMeals = ({
  userMealsArr,
  planID,
}: {
  userMealsArr: UserMealsArr;
  planID: PlansEnum;
}): DietMealGroup => {
  const meals: DietMealGroup = {};
  const today = getToday();

  userMealsArr.map((meal) => {
    const uuid = uuidv4();
    const newDietMeal: DietMeal = {
      complexity: meal.complexity,
      dateCreated: today,
      description: null,
      dietID: null,
      foods: {},
      id: uuid,
      isCookeable: meal.isCookeable,
      mealID: meal.id,
      name: meal.name,
      nameSaved: null,
      order: meal.order,
      planID: planID,
      size: meal.size,
      time: meal.time,
    };
    if (newDietMeal.id) {
      meals[newDietMeal.id] = newDietMeal;
    }
  });
  return meals;
};

const createDiet = ({
  meals,
  planID,
  type,
  user,
}: {
  meals: UserMeals;
  planID: PlansEnum;
  type: PlanTypes;
  user: User;
}): Diet => {
  const userMealsArr = Object.values(meals);
  const mealsGenerated = generateDietMeals({ userMealsArr, planID });
  const diet = buildDiet(Object.values(mealsGenerated), planID, type, user);
  return diet;
};

export { createDiet, generateDietMeals, buildDiet };
