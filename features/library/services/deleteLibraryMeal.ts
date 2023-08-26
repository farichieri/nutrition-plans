import { db } from "@/services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { DietMeal } from "@/features/plans";
import { Result } from "@/types";
import { User } from "@/features/authentication";

const deleteLibraryMeal = async ({
  user,
  meal,
}: {
  user: User;
  meal: DietMeal;
}): Promise<Result<DietMeal, unknown>> => {
  try {
    if (!user.id || !meal.id) throw new Error("No id found");

    const docRef = doc(
      db,
      "users",
      user.id,
      "library",
      "saved",
      "meals",
      meal.id
    );

    await deleteDoc(docRef);

    return { result: "success", data: meal };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { deleteLibraryMeal };
