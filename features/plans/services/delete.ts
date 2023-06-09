import { deleteDoc, doc } from "firebase/firestore";
import { Diet } from "../types";
import { Result } from "@/types";
import { db } from "@/services/firebase/firebase.config";

const deleteDiet = async (diet: Diet): Promise<Result<Diet, unknown>> => {
  try {
    const { user_id, diet_id } = diet;
    if (!user_id || !diet_id) throw Error;
    const docRef = doc(db, "users", user_id, "diets", diet_id);
    await deleteDoc(docRef);
    return { result: "success", data: diet };
  } catch (error) {
    console.log("deleteUserMeal", { error });
    return { result: "error", error };
  }
};

export { deleteDiet };
