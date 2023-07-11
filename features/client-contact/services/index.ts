import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { User } from "@/features/authentication";

const postFeedback = async (user: User, message: string) => {
  try {
    const docRef = collection(db, "feedbacks");
    await addDoc(docRef, {
      user: user.id,
      message: message,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    return { error: `Error posting feedback: ${error}` };
  }
};

export { postFeedback };
