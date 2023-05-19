import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Diet, DietGroup } from "@/types/dietTypes";
import { PlansEnum, UserAccount } from "@/types/types";

const createDiet = async (diet: Diet, user: UserAccount) => {
  try {
    if (!diet.diet_name) return;
    const docRef = doc(collection(db, "diets"));

    const newDiet: Diet = {
      ...diet,
      date_created: serverTimestamp(),
      diet_id: docRef.id,
      diet_name_lowercase: diet.diet_name.toLowerCase(),
      diet_nutrients: { ...diet.diet_nutrients },
      uploader: user.user_id,
    };
    console.log({ newDiet });
    await setDoc(docRef, newDiet);
    console.log("Diet created: ", newDiet);
    return { diet_id: docRef.id };
  } catch (error) {
    console.log({ error });
    return { error: `Error creating Food: ${error}` };
  }
};

const fetchDietByDate = async ({
  date_available,
}: {
  date_available: string;
}) => {
  console.log(`Fetching Food by date_available: '${date_available}'`);
  try {
    let data: DietGroup = {};
    const dietsRef = collection(db, "diets");
    let q = query(
      dietsRef,
      where("date_available", "==", `${date_available}`),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data[food.id] = food.data();
    });
    console.log({ data });
    return data;
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return null;
  }
};

export { createDiet, fetchDietByDate };
