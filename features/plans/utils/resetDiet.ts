import { getToday } from "@/utils";
import { Diet } from "../types";
import { Result } from "@/types";

const resetDiet = ({
  diet,
  newDietID,
}: {
  diet: Diet;
  newDietID: string;
}): Result<Diet, unknown> => {
  try {
    const newDiet = { ...diet };
    const meals = { ...newDiet.meals };

    const today = getToday();
    newDiet.date = null;
    newDiet.dateCreated = today;
    newDiet.id = newDietID;

    Object.keys(meals).forEach((mealID) => {
      const meal = { ...meals[mealID] };

      meal.dietID = newDietID;
      meals[mealID] = { ...meal };
      const foods = { ...meal.foods };

      Object.keys(foods).forEach((foodID) => {
        const food = { ...foods[foodID] };

        foods[foodID] = {
          ...food,
          dietID: newDietID,
          dietMealID: meal.id,
          isEaten: false,
        };
      });
      meals[mealID].foods = foods;
    });

    newDiet.meals = { ...meals };

    return { result: "success", data: newDiet };
  } catch (error) {
    console.error(error);
    return { result: "error", error };
  }
};

export { resetDiet };
