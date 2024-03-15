import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Diet } from "@/features/plans/types";
import { Result } from "@/types";

// It is being used in getDiets |  getDayDiet => Which are used in shopping.. (Can delete when shoppingApi is created.)
const fetchDietByDate = async ({
  date,
  userID,
}: {
  date: string;
  userID: string;
}): Promise<Result<Diet, unknown>> => {
  try {
    const docRef = doc(db, "users", userID, "diets", date);
    const querySnapshot = await getDoc(docRef);
    const data: any = querySnapshot.data() as Diet;
    if (!data) throw new Error("No diet fetched");
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

export { fetchDietByDate };
