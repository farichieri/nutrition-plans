import { Diet } from "../types";

const clearMeal = ({ diet, mealID }: { diet: Diet; mealID: string }): Diet => {
  const newDiet = {
    ...diet,
    meals: { ...diet.meals, [mealID]: { ...diet.meals[mealID], foods: {} } },
  };
  return newDiet;
};

export { clearMeal };
