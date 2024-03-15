import { FoodGroup } from "@/features/foods";
import {
  ShoppingListFoods,
  getDayDiet,
  getShoppingFoods,
} from "@/features/shopping";
import { Result } from "@/types";

const getDietShoppingFoods = async ({
  dates,
  userID,
}: {
  dates: string[];
  userID: string;
}): Promise<Result<ShoppingListFoods, unknown>> => {
  try {
    const promises = dates.map((date) => getDayDiet({ date, userID }));
    const res = await Promise.all(promises);
    let foods: FoodGroup = {};
    res.map((r) => {
      if (r.result === "success") {
        foods = { ...foods, ...r.data };
      }
    });
    const data = getShoppingFoods({ foods });
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

export { getDietShoppingFoods };
