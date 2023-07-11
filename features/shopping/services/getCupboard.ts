import { db } from "@/services/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { Result } from "@/types";
import { User } from "@/features/authentication";

const getCupboard = async ({
  user,
}: {
  user: User;
}): Promise<Result<any, unknown>> => {
  try {
    const docRef = doc(db, "users", user.id, "cupboard", "uniqueCupboard");
    const querySnapshot = await getDoc(docRef);
    const data: any = querySnapshot.data();
    if (!data) throw new Error("No data fetched.");
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

export { getCupboard };
