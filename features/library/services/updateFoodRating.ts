import { db } from "@/services/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";
import { Result } from "@/types";

const updateFoodRating = async ({
  foodID,
  field,
  action,
}: {
  foodID: string;
  field: string;
  action: string;
}): Promise<Result<string, unknown>> => {
  try {
    if (!foodID) throw new Error("No id found");
    const docRef = doc(db, "foods", foodID);

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

    return { result: "success", data: foodID };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { updateFoodRating };
