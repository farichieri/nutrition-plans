import { Result } from "@/types";
import { User } from "@/features/authentication";
import { UserMeals, UserMealsArr, updateUserMeal } from "@/features/meals";

const updateMealsOrders = async (
  mealsReordered: UserMealsArr,
  user: User
): Promise<Result<UserMeals, unknown>> => {
  try {
    if (!user?.id) throw new Error("No user found");
    const mealsUpdated: UserMeals = {};
    mealsReordered.forEach((meal, index) => {
      if (!meal.id) return;
      mealsUpdated[meal.id] = {
        ...meal,
        order: index,
      };
    });
    Object.values(mealsUpdated).map(async (meal) => {
      const res = await updateUserMeal(user, meal);
      if (res.result === "error") {
        console.log("Error reordering meals");
      }
    });
    return { result: "success", data: mealsUpdated };
  } catch (error) {
    return { result: "error", error };
  }
};

export { updateMealsOrders };
