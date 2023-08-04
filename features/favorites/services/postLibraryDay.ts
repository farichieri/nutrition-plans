import { db } from "@/services/firebase/firebase.config";
import { Diet } from "@/features/plans";
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

    const newDiet: Diet = {
      ...diet,
      nutrients: { ...diet.nutrients },
      id: docID,
    };

    await setDoc(docRef, newDiet);

    return { result: "success", data: newDiet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { postLibraryDay };
