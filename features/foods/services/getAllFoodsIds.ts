import { db } from "@/services/firebase/firebase.config";
import { Result } from "@/types";
import { collection, getDocs } from "firebase/firestore";

const getAllFoodsIds = async (): Promise<Result<string[], unknown>> => {
  try {
    let data: string[] = [];
    const foodsRef = collection(db, "foods");
    const querySnapshot = await getDocs(foodsRef);
    querySnapshot.forEach((food: any) => {
      data.push(food.id);
    });
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

export { getAllFoodsIds };
