import { FoodGroup } from "@/features/foods";
import { getDietFoods } from "@/features/plans";
import { fetchDietByDate } from "@/features/plans/services";
import { Result } from "@/types";

const getDayDiet = async ({
  date,
  userID,
}: {
  date: string;
  userID: string;
}): Promise<Result<FoodGroup, unknown>> => {
  try {
    const res = await fetchDietByDate({ date, userID });
    if (res.result === "success") {
      const foods = getDietFoods({ diet: res.data });
      return { result: "success", data: foods };
    } else {
      throw new Error(`Error fetching diet for ${date}`);
    }
  } catch (error) {
    return { result: "error", error };
  }
};

export { getDayDiet };
