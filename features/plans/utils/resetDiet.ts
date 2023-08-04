import { getToday } from "@/utils";
import { Diet } from "../types";
import { Result } from "@/types";

const resetDiet = ({ diet }: { diet: Diet }): Result<Diet, unknown> => {
  try {
    const newDiet = { ...diet };
    const { meals } = newDiet;

    const today = getToday();
    newDiet.date = null;
    newDiet.dateCreated = today;

    Object.keys(meals).forEach((mealID) => {
      const { ...meal } = meals[mealID];
      meal.dietID = diet.id;
      const { foods } = meal;
      Object.keys(foods).forEach((foodID) => {
        const { ...food } = foods[foodID];
        food.dietID = diet.id;
        food.mealID = meal.id;
        food.isEaten = false;
      });
    });

    console.log({ newDiet });

    return { result: "success", data: newDiet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { resetDiet };
