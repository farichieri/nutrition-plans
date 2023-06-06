import {
  collection,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../../services/firebase/firebase.config";
import { DEFAULT_IMAGE } from "@/types/initialTypes";
import { Food, FoodGroup, FoodKind } from "@/features/foods";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Result } from "@/types";
import { UserAccount } from "@/features/authentication";

const addFood = async (
  food: Food,
  kind: FoodKind,
  newImage: File | undefined,
  user: UserAccount
): Promise<Result<Food, unknown>> => {
  try {
    if (!food.food_name) throw new Error("No food_name provided");
    const docRef = doc(collection(db, "foods"));
    const imageURL: string | { error: string } | undefined =
      newImage && (await uploadImage(newImage, docRef.id));
    let img =
      newImage && typeof imageURL === "string" ? imageURL : DEFAULT_IMAGE;
    let indexResponse = await getFoodsCollectionLength();
    const { result } = indexResponse;
    if (result === "error") throw Error;
    const index = indexResponse.data;

    const numIngredients = Object.keys(food.ingredients).length;
    const complexity =
      1 + numIngredients + food.prep_time + food.cook_time * 0.2;

    // Add the default scale:
    const newScales = [...food.scales];
    newScales.unshift({
      scale_name: food.serving_name,
      scale_amount: 1,
      scale_grams: food.serving_grams,
      is_default: true,
    });

    const newFood: Food = {
      ...food,
      date_created: serverTimestamp(),
      food_id: docRef.id,
      food_name_lowercase: food.food_name.toLowerCase(),
      image: img,
      kind: kind,
      nutrients: { ...food.nutrients },
      scales: newScales,
      num_ingredients: numIngredients,
      uploader_id: user.user_id,
      index: index,
      complexity: complexity,
      total_time: food.cook_time + food.prep_time,
    };
    console.log({ newFood });
    await setDoc(docRef, newFood);
    console.log("Food created: ", newFood);
    return { result: "success", data: newFood };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

const fetchFoods = async ({
  food_name_lowercase,
  kind,
  uploader_id,
}: {
  food_name_lowercase: string;
  kind: FoodKind | undefined;
  uploader_id?: string;
}): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching Food by name: '${food_name_lowercase}'`);
  try {
    console.log({ food_name_lowercase });
    let data: FoodGroup = {};
    const foodsRef = collection(db, "foods");
    let q = query(
      foodsRef,
      where("food_name_lowercase", ">=", `${food_name_lowercase}`),
      where("food_name_lowercase", "<=", `${food_name_lowercase}z`),
      where("curated", "==", true),
      limit(40)
    );
    // if (kind) {
    //   q = query(
    //     foodsRef,
    //     where("food_name_lowercase", ">=", `${food_name_lowercase}`),
    //     where("food_name_lowercase", "<=", `${food_name_lowercase}z`),
    //     limit(40)
    //     // where("kind", "==", `${kind}`),
    //   );
    // }
    if (uploader_id) {
      q = query(
        foodsRef,
        where("food_name_lowercase", ">=", `${food_name_lowercase}`),
        where("food_name_lowercase", "<=", `${food_name_lowercase}z`),
        limit(40)
      );
      // where("uploader_id", "==", `${uploader_id}`),
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data[food.id] = food.data();
    });
    console.log({ data });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoodByID = async (food_id: string) => {
  console.log(`Fetching Food ${food_id}`);
  try {
    const foodRef = doc(db, "foods", food_id);
    const querySnapshot = await getDoc(foodRef);
    const data: any = querySnapshot.data();
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return null;
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

const uploadImage = async (file: Blob, food_id: string) => {
  try {
    const storageRef = ref(storage, `foods/${food_id}/default_image`);
    const uploadRes = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    if (!imageUrl) return { error: "Error uploading image" };
    return imageUrl;
  } catch (error) {
    return { error: `Error uploading image ${error}` };
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
  addFood,
  fetchFoods,
  fetchFoodByID,
  fetchFoodsByIDS,
  getFoodsCollectionLength,
};
