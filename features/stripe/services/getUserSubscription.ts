import { db } from "@/services/firebase/firebase.config";
import { Result } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";

const getUserSubscription = async ({
  userID,
}: {
  userID: string;
}): Promise<Result<any, unknown>> => {
  try {
    const docRef = collection(db, "users", userID, "subscriptions");
    const q = query(docRef, where("status", "in", ["active", "trialing"]));
    // In this implementation we only expect one active or trialing subscription to exist.
    const docSnap = await getDocs(q);
    const doc = docSnap.docs[0].data();
    return { result: "success", data: doc };
  } catch (error) {
    return { result: "error", error };
  }
};

export default getUserSubscription;
