import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { DietGroup } from "@/features/plans";
import { Result } from "@/types";

const getSavedDays = async ({
  userID,
}: {
  userID: string;
}): Promise<Result<DietGroup, unknown>> => {
  console.log(`Fetching Saved Diets`);
  try {
    let data: DietGroup = {};
    const docsRef = collection(db, "users", userID, "library", "saved", "days");
    const querySnapshot = await getDocs(docsRef);
    querySnapshot.forEach((doc: any) => {
      data[doc.id] = doc.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Diets: ${error}` });
    return { result: "error", error };
  }
};

export { getSavedDays };
