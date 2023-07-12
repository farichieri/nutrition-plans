import { Cupboard } from "../types";
import { db } from "@/services/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { Result } from "@/types";

const getCupboard = async ({
  userID,
}: {
  userID: string;
}): Promise<Result<Cupboard, unknown>> => {
  try {
    const docRef = doc(db, "users", userID, "cupboard", "uniqueCupboard");
    const querySnapshot = await getDoc(docRef);
    const data: any = querySnapshot.data();
    const cupboard = data || {};
    return { result: "success", data: cupboard };
  } catch (error) {
    return { result: "error", error };
  }
};

export { getCupboard };
