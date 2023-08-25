import { Cupboard } from "../types";
import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Result } from "@/types";

const getCupboard = async ({
  userID,
}: {
  userID: string;
}): Promise<Result<Cupboard, unknown>> => {
  try {
    const docRef = doc(db, "users", userID, "shopping", "cupboard");
    const querySnapshot = await getDoc(docRef);
    const data: any = (querySnapshot.data() as Cupboard) || {};
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

export { getCupboard };
