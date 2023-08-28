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

const buildDiet = ({
  meals,
  planID,
  type,
  user,
  date,
}: {
  meals: DietMealGroupArr;
  planID: PlansEnum;
  type: PlanTypes;
  user: User;
  date: string;
}) => {
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
    planSelected: planID,
  });

  const diet: Diet = {
    ...NewDiet,
    date: date,
    dateCreated: null,
    description: null,
    hideNutritionTargetsDiff: false,
    id: date,
    meals: dietMeals,
    name: null,
    nutrients: nutrition,
    nutritionTargets: nutritionTargets,
    planID: planID,
    type: type,
    userID: user.id,
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
  dietID,
}: {
  userMealsArr: UserMealsArr;
  planID: PlansEnum;
  dietID: string;
}): DietMealGroup => {
  const meals: DietMealGroup = {};
  const today = getToday();

  userMealsArr.map((meal) => {
    const uuid = uuidv4();
    const newDietMeal: DietMeal = {
      complexity: meal.complexity,
      dateCreated: today,
      description: null,
      dietID: dietID,
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
      type: meal.type,
    };
    if (newDietMeal.id) {
      meals[newDietMeal.id] = newDietMeal;
    }
  });
  return meals;
};

const createDiet = ({
  date,
  meals,
  planID,
  type,
  user,
}: {
  date: string;
  meals: UserMeals;
  planID: PlansEnum;
  type: PlanTypes;
  user: User;
}): Diet => {
  const userMealsArr = Object.values(meals);
  const mealsGenerated = generateDietMeals({
    userMealsArr,
    planID,
    dietID: date,
  });
  const mealsGeneratedArr = Object.values(mealsGenerated);
  const diet = buildDiet({
    date,
    meals: mealsGeneratedArr,
    planID,
    type,
    user,
  });
  return diet;
};

export { createDiet, generateDietMeals, buildDiet };
