import { db } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { Progress, ProgressItem, UserAccount } from "@/types/types";
import { User } from "firebase/auth";

const addProgress = async (user: UserAccount, progress: ProgressItem) => {
  try {
    const docRef = doc(db, "users", user.user_id, "progress", progress.date);
    await setDoc(docRef, progress);
  } catch (error) {
    return { error: `Error creating Progress: ${error}` };
  }
};

const fetchProgress = async (user: User) => {
  console.log("Fetching Progress");
  try {
    let data: Progress = {};
    const progressRef = query(collection(db, "users", user.uid, "progress"));
    const querySnapshot = await getDocs(progressRef);
    querySnapshot.forEach((progress: any) => {
      data[progress.id] = progress.data();
    });
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const deleteProgress = async (user: UserAccount, progress: ProgressItem) => {
  try {
    const docRef = doc(db, "users", user.user_id, "progress", progress.date);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
    return { error: "Error deleting progress" };
  }
};

const updateProgress = async (user: UserAccount, progress: ProgressItem) => {
  try {
    console.log(progress)
    const docRef = doc(db, "users", user.user_id, "progress", progress.date);
    await setDoc(docRef, progress);
  } catch (error) {
    console.log(error);
    return { error: "Error updating progress" };
  }
};

export { addProgress, fetchProgress, deleteProgress, updateProgress };
