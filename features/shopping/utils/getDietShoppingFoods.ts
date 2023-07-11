import { FoodGroup } from "@/features/foods";
import { getDayDiet, getShoppingFoods } from "@/features/shopping";

const getDietShoppingFoods = async ({
  dates,
  userID,
}: {
  dates: string[];
  userID: string;
}) => {
  try {
    const promises = dates.map((date) => getDayDiet({ date, userID }));
    const res = await Promise.all(promises);
    let foods: FoodGroup = {};
    res.map((r) => {
      if (r.result === "success") {
        foods = { ...foods, ...r.data };
      }
    });
    return getShoppingFoods({ foods });
  } catch (error) {}
};

export { getDietShoppingFoods };
