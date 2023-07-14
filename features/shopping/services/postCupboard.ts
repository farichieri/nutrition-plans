import { Cupboard } from "../types";
import { db } from "@/services/firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { Result } from "@/types";
import { User } from "@/features/authentication";

const postCupboard = async ({
  cupboard,
  user,
}: {
  cupboard: Cupboard;
  user: User;
}): Promise<Result<Cupboard, unknown>> => {
  try {
    const docRef = doc(db, "users", user.id, "shopping", "cupboard");
    await setDoc(docRef, cupboard);
    return { result: "success", data: cupboard };
  } catch (error) {
    return { result: "error", error };
  }
};

export { postCupboard };
