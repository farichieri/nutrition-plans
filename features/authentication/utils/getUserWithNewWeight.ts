import {
  calculateBMI,
  calculateBMR,
  calculateKCALSRecommended,
} from "./calculateBodyData";
import { getNutritionTargets } from "./getNutritionTargets";
import { User } from "../types";
import { Result } from "@/types";
import { getWater } from "./getWater";
import { formatTwoDecimals } from "@/utils";

// update nutritionTargets and bodyData when user changes weight
const getUserWithNewWeight = ({
  user,
  newWeightInKgs,
}: {
  user: User;
  newWeightInKgs: number;
}): Result<User, unknown> => {
  try {
    const { goal, bodyData, planSelected, measurementUnit } = user;
    const { activity } = bodyData;
    const BMR = calculateBMR({
      kgs: newWeightInKgs,
      cms: bodyData.heightInCm!,
      age: bodyData.age!,
      gender: bodyData.gender!,
    });

    const BMI = calculateBMI({
      kgs: newWeightInKgs,
      cms: bodyData.heightInCm!,
    });

    if (!BMR) throw new Error("BMR is not defined");
    if (!goal) throw new Error("Goal is not defined");
    if (!activity) throw new Error("Activity is not defined");
    if (!planSelected) throw new Error("Plan is not defined");

    const calories = calculateKCALSRecommended({ BMR, goal, activity });

    const nutritionTargets = getNutritionTargets({ calories, planSelected });

    const lts = getWater({
      weightInKg: newWeightInKgs,
      measurement: measurementUnit,
    });

    const newUser = {
      ...user,
      bodyData: {
        ...user.bodyData,
        BMI: BMI,
        BMR: BMR,
        waterRecommendedInLts: formatTwoDecimals(lts),
        weightInKg: newWeightInKgs,
      },
      nutritionTargets: nutritionTargets,
    };

    return { result: "success", data: newUser };
  } catch (error) {
    console.error(error);
    return { result: "error", error };
  }
};

export { getUserWithNewWeight };
