import { db } from "@/services/firebase/firebase.config";
import { Diet } from "..";
import { doc, setDoc } from "firebase/firestore";
import { Result } from "@/types";

const saveDiet = async ({
  diet,
}: {
  diet: Diet;
}): Promise<Result<Diet, unknown>> => {
  try {
    if (!diet.userID || !diet.id) throw new Error("Invalid diet fields");
    const docRef = doc(db, "users", diet.userID, "diets", diet.id);

    diet = {
      ...diet,
      nutrients: { ...diet.nutrients },
    };
    await setDoc(docRef, diet);

    return { result: "success", data: diet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { saveDiet };
