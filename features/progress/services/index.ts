import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebase.config";
import { Result } from "@/types";
import { User } from "firebase/auth";
import { UserAccount } from "@/features/authentication";
import { ProgressItem, Progress } from "@/features/progress";

const addProgress = async (user: UserAccount, progress: ProgressItem) => {
  try {
    const docRef = doc(db, "users", user.user_id, "progress", progress.date);
    await setDoc(docRef, progress);
  } catch (error) {
    return { error: `Error creating Progress: ${error}` };
  }
};

const fetchProgress = async (
  user: User
): Promise<Result<Progress, unknown>> => {
  console.log("fetchProgress");
  try {
    let data: Progress = {};
    const progressRef = query(collection(db, "users", user.uid, "progress"));
    const querySnapshot = await getDocs(progressRef);
    querySnapshot.forEach((progress: any) => {
      data[progress.id] = progress.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log(error);
    return { result: "error", error };
  }
};

const deleteProgress = async (
  user: UserAccount,
  progress: ProgressItem
): Promise<Result<boolean, unknown>> => {
  try {
    const docRef = doc(db, "users", user.user_id, "progress", progress.date);
    await deleteDoc(docRef);
    return { result: "success", data: true };
  } catch (error) {
    console.log(error);
    return { result: "error", error };
  }
};

const updateProgress = async (
  user: UserAccount,
  progress: ProgressItem
): Promise<Result<ProgressItem, unknown>> => {
  try {
    console.log(progress);
    const docRef = doc(db, "users", user.user_id, "progress", progress.date);
    await setDoc(docRef, progress);
    return { result: "success", data: progress };
  } catch (error) {
    console.log(error);
    return { result: "error", error };
  }
};

export { addProgress, fetchProgress, deleteProgress, updateProgress };
