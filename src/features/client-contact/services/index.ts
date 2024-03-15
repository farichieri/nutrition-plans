import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { User } from "@/features/authentication";
import { formatISO } from "date-fns";

const postFeedback = async (user: User, message: string) => {
  try {
    const docRef = collection(db, "feedbacks");
    await addDoc(docRef, {
      dateCreated: formatISO(new Date()),
      message: message,
      user: user.id,
      userEmail: user.emailAddress,
    });
  } catch (error) {
    return { error: `Error posting feedback: ${error}` };
  }
};

export { postFeedback };
