import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { DietGroup, DietMealGroup } from "@/features/plans";
import { Result } from "@/types";

const getSavedMeals = async ({
  userID,
}: {
  userID: string;
}): Promise<Result<DietMealGroup, unknown>> => {
  console.log(`Fetching Saved Meals`);
  try {
    let data: DietMealGroup = {};
    const docsRef = collection(
      db,
      "users",
      userID,
      "library",
      "saved",
      "meals"
    );
    const querySnapshot = await getDocs(docsRef);
    querySnapshot.forEach((doc: any) => {
      data[doc.id] = doc.data();
    });
    console.log({ data });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Meals: ${error}` });
    return { result: "error", error };
  }
};

export { getSavedMeals };
