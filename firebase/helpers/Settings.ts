import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { UserAccount } from "@/types/types";

const postFeedback = async (user: UserAccount, message: string) => {
  try {
    const docRef = collection(db, "feedbacks");
    await addDoc(docRef, {
      user: user.user_id,
      message: message,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    return { error: `Error posting feedback: ${error}` };
  }
};

export { postFeedback };
