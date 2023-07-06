import { deleteDoc, doc } from "firebase/firestore";
import { Diet } from "@/features/plans";
import { Result } from "@/types";
import { db } from "@/services/firebase/firebase.config";

const deleteDiet = async (diet: Diet): Promise<Result<Diet, unknown>> => {
  try {
    const { userID: userID, id } = diet;
    if (!userID || !id) throw Error;
    const docRef = doc(db, "users", userID, "diets", id);
    await deleteDoc(docRef);
    return { result: "success", data: diet };
  } catch (error) {
    console.log("deleteUserMeal", { error });
    return { result: "error", error };
  }
};

export { deleteDiet };
