import { db } from "@/services/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Diet } from "@/features/plans";
import { Result } from "@/types";
import { User } from "@/features/authentication";

const deleteLibraryDay = async ({
  user,
  diet,
}: {
  user: User;
  diet: Diet;
}): Promise<Result<Diet, unknown>> => {
  try {
    if (!user.id || !diet.id) throw new Error("No id found");

    const docRef = doc(
      db,
      "users",
      user.id,
      "library",
      "saved",
      "days",
      diet.id
    );

    await deleteDoc(docRef);

    return { result: "success", data: diet };
  } catch (error) {
    console.error(error);
    return { result: "error", error };
  }
};

export { deleteLibraryDay };
