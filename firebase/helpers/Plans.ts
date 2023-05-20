import { db } from "../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { PlansEnum, UserAccount } from "@/types/types";

const updateUserPlan = async (planID: PlansEnum, user: UserAccount) => {
  try {
    const userRef = doc(db, "users", user.user_id);
    await updateDoc(userRef, {
      plan_selected: planID,
    });
  } catch (error) {
    return { error: "Error updating plan_selected" };
  }
};

export { updateUserPlan };
