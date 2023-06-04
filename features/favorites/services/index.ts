import { UserAccount } from "@/features/authentication";
import { db } from "@/services/firebase/firebase.config";
import { Result } from "@/types";
import { doc, increment, updateDoc } from "firebase/firestore";

const updateFoodRating = async (
  food_id: string,
  field: string,
  action: string
): Promise<Result<string, unknown>> => {
  try {
    if (!food_id) throw new Error("No food_id found");
    const docRef = doc(db, "foods", food_id);
    if (action === "increment") {
      await updateDoc(docRef, {
        [field]: increment(1),
      });
    } else if (action === "decrement") {
      await updateDoc(docRef, {
        [field]: increment(-1),
      });
    } else {
      throw new Error("action invalid");
    }
    return { result: "success", data: food_id };
  } catch (error) {
    return { result: "error", error };
  }
};

export { updateFoodRating };
