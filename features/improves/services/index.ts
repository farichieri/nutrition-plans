import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase.config";
import { UserMeal } from "@/features/meals";
import { PlansEnum, Result } from "@/types";

// creates too many docs...
const saveFoodFilterNotFound = async (
  userMeal: UserMeal,
  planID: PlansEnum
): Promise<Result<UserMeal, unknown>> => {
  try {
    const docRef = doc(collection(db, "improves", "plans", "foods-not-found"));
    const newUserMealNotFound = {
      complexity: userMeal.complexity,
      isCookeable: userMeal.isCookeable,
      size: userMeal.size,
      time: userMeal.time,
      plan: planID,
    };
    await setDoc(docRef, newUserMealNotFound);
    return { result: "success", data: userMeal };
  } catch (error) {
    return { result: "error", error };
  }
};

export { saveFoodFilterNotFound };
