import { getToday } from "@/utils";
import { DietMeal } from "../types";
import { Result } from "@/types";

const resetMeal = ({
  meal,
  newDietID,
  newMealID,
  newMealName,
}: {
  meal: DietMeal;
  newDietID: string | null;
  newMealID: string;
  newMealName: string | null;
}): Result<DietMeal, unknown> => {
  try {
    const newMeal = { ...meal };
    const today = getToday();

    newMeal.dateCreated = today;
    newMeal.dietID = newDietID;
    newMeal.id = newMealID;
    newMeal.name = null;
    newMeal.order = -1;
    newMeal.name = newMealName;

    const foods = { ...meal.foods };

    Object.keys(foods).forEach((foodID) => {
      const food = { ...foods[foodID] };

      foods[foodID] = {
        ...food,
        dietID: newDietID,
        dietMealID: newMealID,
        isEaten: false,
      };
    });
    newMeal.foods = foods;

    return { result: "success", data: newMeal };
  } catch (error) {
    console.error(error);
    return { result: "error", error };
  }
};

export { resetMeal };
