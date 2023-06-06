import {
  collection,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { Food, FoodGroup } from "@/features/foods";
import { Result } from "@/types";
import { db } from "@/services/firebase/firebase.config";

const fetchCuratedFoods = async ({
  food_name_lowercase,
}: {
  food_name_lowercase: string;
}): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching CuratedFoods by name: '${food_name_lowercase}'`);
  try {
    let data: FoodGroup = {};
    const foodsRef = collection(db, "foods");
    let q = query(
      foodsRef,
      where("food_name_lowercase", ">=", `${food_name_lowercase}`),
      where("food_name_lowercase", "<=", `${food_name_lowercase}z`),
      where("curated", "==", true),
      limit(40)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data[food.id] = food.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchUserFoods = async ({
  food_name_lowercase,
  uploader_id,
}: {
  food_name_lowercase: string;
  uploader_id?: string;
}): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching UserFoods by name: '${food_name_lowercase}'`);
  try {
    console.log({ food_name_lowercase });
    let data: FoodGroup = {};
    const foodsRef = collection(db, "foods");
    let q = query(
      foodsRef,
      where("food_name_lowercase", ">=", `${food_name_lowercase}`),
      where("food_name_lowercase", "<=", `${food_name_lowercase}z`),
      where("uploader_id", "==", `${uploader_id}`),
      limit(40)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data[food.id] = food.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoods = async ({
  food_name_lowercase,
  uploader_id,
}: {
  food_name_lowercase: string;
  uploader_id?: string;
}): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching Foods by name: '${food_name_lowercase}'`);
  try {
    console.log({ food_name_lowercase });
    let data: FoodGroup = {};

    const [curatedFoodsRes, userFoodsRes] = await Promise.all([
      fetchCuratedFoods({ food_name_lowercase }),
      fetchUserFoods({ food_name_lowercase, uploader_id }),
    ]);

    if (
      curatedFoodsRes.result === "success" &&
      userFoodsRes.result === "success"
    ) {
      data = { ...curatedFoodsRes.data, ...userFoodsRes.data };
    } else {
      throw new Error("Error fetching foods.");
    }
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoodByID = async (
  food_id: string
): Promise<Result<Food, unknown>> => {
  console.log(`Fetching Food ${food_id}`);
  try {
    const foodRef = doc(db, "foods", food_id);
    const querySnapshot = await getDoc(foodRef);
    const data: any = querySnapshot.data();
    if (!data) throw new Error("No food found");
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoodsByIDS = async (
  food_ids: string[]
): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching Food IDS ${food_ids}`);
  try {
    let data: FoodGroup = {};
    const foodRef = collection(db, "foods");
    const q = query(foodRef, where(documentId(), "in", food_ids));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data[food.id] = food.data();
    });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Foods: ${error}` });
    return { result: "error", error };
  }
};

const getFoodsCollectionLength = async (): Promise<Result<number, unknown>> => {
  try {
    const docRef = collection(db, "foods");
    let q = query(docRef);

    const snapshot = await getCountFromServer(q);
    const collLength: number = snapshot.data().count;

    return { result: "success", data: collLength };
  } catch (error) {
    return { result: "error", error };
  }
};

export {
  fetchFoods,
  fetchUserFoods,
  fetchFoodByID,
  fetchFoodsByIDS,
  getFoodsCollectionLength,
};
