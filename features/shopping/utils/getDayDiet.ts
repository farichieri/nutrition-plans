import { FoodGroup } from "@/features/foods";
import { getDietFoods } from "@/features/plans";
import { Result } from "@/types";

const getDayDiet = async ({
  date,
  userID,
}: {
  date: string;
  userID: string;
}): Promise<Result<FoodGroup, unknown>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userID}/diets/${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (res.result === "success") {
      if (Object.values(res.data).length < 1) {
        return { result: "success", data: {} };
      }
      const foods = getDietFoods({ diet: res.data });
      return { result: "success", data: foods };
    } else {
      throw Error(res.error);
    }
  } catch (error) {
    return { result: "error", error };
  }
};

export { getDayDiet };
