import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { DietGroup } from "@/features/plans";
import { Result } from "@/types";

const getFavoritePlans = async ({
  ids,
  userID,
}: {
  ids: string[];
  userID: string;
}): Promise<Result<DietGroup, unknown>> => {
  console.log(`Fetching Diet IDS ${ids}`);
  try {
    let data: DietGroup = {};
    const foodRef = collection(db, "users", userID, "diets");
    const q = query(foodRef, where(documentId(), "in", ids));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      data[doc.id] = doc.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Diets: ${error}` });
    return { result: "error", error };
  }
};

export { getFavoritePlans };
