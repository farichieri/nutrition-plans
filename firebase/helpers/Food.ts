import { db } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { UserAccount } from "@/types/types";
import { Food } from "@/types/foodTypes";

const addFood = async (user: UserAccount, food: Food) => {
  try {
    const docRef = doc(collection(db, "foods"));
    const newFood: Food = {
      ...food,
      date_created: serverTimestamp(),
      food_id: docRef.id,
      user_id: user.user_id,
    };
    await setDoc(docRef, newFood);
  } catch (error) {
    return { error: `Error creating Food: ${error}` };
  }
};
// timestamp: serverTimestamp(),

// const fetchProgress = async (user: User) => {
//   console.log("Fetching Progress");
//   try {
//     let data: Progress = {};
//     const progressRef = query(collection(db, "users", user.uid, "progress"));
//     const querySnapshot = await getDocs(progressRef);
//     querySnapshot.forEach((progress: any) => {
//       data[progress.id] = progress.data();
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     return {};
//   }
// };

// const deleteProgress = async (user: UserAccount, progress: ProgressItem) => {
//   try {
//     const docRef = doc(db, "users", user.user_id, "progress", progress.date);
//     await deleteDoc(docRef);
//   } catch (error) {
//     console.log(error);
//     return { error: "Error deleting progress" };
//   }
// };

// const updateProgress = async (user: UserAccount, progress: ProgressItem) => {
//   try {
//     console.log(progress);
//     const docRef = doc(db, "users", user.user_id, "progress", progress.date);
//     await setDoc(docRef, progress);
//   } catch (error) {
//     console.log(error);
//     return { error: "Error updating progress" };
//   }
// };

export { addFood };
