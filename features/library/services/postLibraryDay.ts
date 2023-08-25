import { db } from "@/services/firebase";
import { Diet, resetDiet } from "@/features/plans";
import { doc, setDoc } from "firebase/firestore";
import { Result } from "@/types";
import { User } from "@/features/authentication";
import { uuidv4 } from "@firebase/util";

const postLibraryDay = async ({
  user,
  diet,
}: {
  user: User;
  diet: Diet;
}): Promise<Result<Diet, unknown>> => {
  try {
    if (!user.id) throw new Error("No id found");
    const uuid = uuidv4();

    const docRef = doc(db, "users", user.id, "library", "saved", "days", uuid);
    const docID = docRef.id;

    const dietResseted = resetDiet({ diet, newDietID: docID });

    if (dietResseted.result === "error") throw Error;

    const newDiet: Diet = {
      ...dietResseted.data,
      nutrients: { ...diet.nutrients },
    };

    await setDoc(docRef, newDiet);

    return { result: "success", data: newDiet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { postLibraryDay };
