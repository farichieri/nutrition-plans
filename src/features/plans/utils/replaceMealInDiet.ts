import { Diet, DietMeal } from "../types";

// Replace a meal in a diet with a new meal.
const replaceMealInDiet = ({
  diet,
  meal,
  replaceMealID,
}: {
  diet: Diet;
  meal: DietMeal;
  replaceMealID: string;
}): Diet => {
  const newDiet = { ...diet };
  const newMeals = { ...newDiet.meals };
  const newMeal = { ...meal };
  const foods = { ...newMeal.foods };

  Object.keys(foods).forEach((id) => {
    const food = { ...foods[id] };
    foods[id] = {
      ...food,
      dietID: newDiet.id,
      dietMealID: replaceMealID,
      isEaten: false,
    };
  });

  newMeals[replaceMealID] = {
    ...newMeals[replaceMealID],
    foods: { ...foods },
  };

  newDiet.meals = { ...newMeals };

  return newDiet;
};

export { replaceMealInDiet };
