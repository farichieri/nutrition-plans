import { db } from "@/services/firebase";
import { DietMeal, resetMeal } from "@/features/plans";
import { doc, setDoc } from "firebase/firestore";
import { Result } from "@/types";
import { User } from "@/features/authentication";
import { uuidv4 } from "@firebase/util";

const postLibraryMeal = async ({
  user,
  meal,
}: {
  user: User;
  meal: DietMeal;
}): Promise<Result<DietMeal, unknown>> => {
  try {
    if (!user.id) throw new Error("No id found");
    const uuid = uuidv4();

    const docRef = doc(db, "users", user.id, "library", "saved", "meals", uuid);
    const docID = docRef.id;

    const mealResetted = resetMeal({
      meal,
      newMealID: docID,
      newDietID: null,
      newMealName: null,
    });

    if (mealResetted.result === "error") throw Error;

    const newMeal: DietMeal = {
      ...mealResetted.data,
    };

    await setDoc(docRef, newMeal);

    return { result: "success", data: newMeal };
  } catch (error) {
    console.error(error);
    return { result: "error", error };
  }
};

export { postLibraryMeal };
