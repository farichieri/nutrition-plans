import { PremiumPlan, UserAccount } from "@/types/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const updateUserPlan = async (plan: PremiumPlan, user: UserAccount) => {
  try {
    const userRef = doc(db, "users", user.user_id);
    await updateDoc(userRef, {
      plan_selected: plan.id,
    });
  } catch (error) {
    return { error: "Error updating plan_selected" };
  }
};

export { updateUserPlan };
