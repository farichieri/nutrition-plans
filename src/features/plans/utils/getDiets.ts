import { Result } from "@/types";
import { DietGroup } from "../types";
import { fetchDietByDate } from "@/features/plans/services";

const getDiets = async ({
  dates,
  userID,
}: {
  dates: string[];
  userID: string;
}): Promise<Result<DietGroup, unknown>> => {
  try {
    const diets: DietGroup = {};
    for (const date of dates) {
      const diet = await fetchDietByDate({ date, userID });
      if (diet.result === "success") {
        diets[date] = diet.data;
      }
    }
    return { result: "success", data: diets };
  } catch (error) {
    return { result: "error", error };
  }
};

export { getDiets };
