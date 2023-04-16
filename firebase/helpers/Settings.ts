import { UserAccount } from "@/types/types";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { formatISO } from "date-fns";

const postFeatureOrReport = async (
  user: UserAccount,
  action: string,
  message: string
) => {
  try {
    const id = formatISO(new Date());
    const docRef = doc(db, "supports", action, user.user_id, id);
    await setDoc(docRef, {
      [action]: message,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    return { error: `Error posting ${action}: ${error}` };
  }
};

export { postFeatureOrReport };
