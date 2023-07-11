import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { User } from "@/features/authentication";
import { formatISO } from "date-fns";

const postFeedback = async (user: User, message: string) => {
  try {
    const docRef = collection(db, "feedbacks");
    await addDoc(docRef, {
      user: user.id,
      message: message,
      dateCreated: formatISO(new Date()),
    });
  } catch (error) {
    return { error: `Error posting feedback: ${error}` };
  }
};

export { postFeedback };
