import { db, storage } from "../firebase.config";
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
import { DEFAULT_IMAGE } from "@/types/initialTypes";
import { Food, FoodGroup, FoodKind } from "@/types/foodTypes";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserAccount } from "@/types/types";

const addFood = async (
  food: Food,
  kind: FoodKind,
  newImage: File | undefined,
  user: UserAccount
) => {
  try {
    if (!food.food_name) return;
    const docRef = doc(collection(db, "foods"));
    const imageURL: string | { error: string } | undefined =
      newImage && (await uploadImage(newImage, docRef.id));
    let img =
      newImage && typeof imageURL === "string" ? imageURL : DEFAULT_IMAGE;
    const newFood: Food = {
      ...food,
      date_created: serverTimestamp(),
      food_id: docRef.id,
      food_name_lowercase: food.food_name.toLowerCase(),
      image: img,
      kind: kind,
      nutrients: { ...food.nutrients },
      scale_amount: food.serving_amount,
      scale_name: food.serving_name,
      uploader: user.user_id,
    };
    console.log({ newFood });
    await setDoc(docRef, newFood);
    console.log("Food created: ", newFood);
    return { food_id: docRef.id };
  } catch (error) {
    console.log({ error });
    return { error: `Error creating Food: ${error}` };
  }
};

const fetchFoods = async ({
  food_name_lowercase,
  kind,
}: {
  food_name_lowercase: string;
  kind: FoodKind | undefined;
}) => {
  console.log(`Fetching Food by name: '${food_name_lowercase}'`);
  try {
    let data: FoodGroup = {};
    const foodsRef = collection(db, "foods");
    let q = query(
      foodsRef,
      where("food_name_lowercase", ">=", `${food_name_lowercase}`),
      where("food_name_lowercase", "<=", `${food_name_lowercase}z`),
      limit(40)
    );
    if (kind) {
      q = query(
        foodsRef,
        where("food_name_lowercase", ">=", `${food_name_lowercase}`),
        where("food_name_lowercase", "<=", `${food_name_lowercase}z`),
        limit(40)
        // where("kind", "==", `${kind}`),
      );
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data[food.id] = food.data();
    });
    console.log({ data });
    return data;
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return {};
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

const fetchFoodsByIDS = async (food_ids: string[]) => {
  console.log(`Fetching Food IDS ${food_ids}`);
  try {
    let data: FoodGroup = {};
    const foodRef = collection(db, "foods");
    const q = query(foodRef, where(documentId(), "in", food_ids));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data[food.id] = food.data();
    });
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log({ error: `Error fetching Foods: ${error}` });
    return null;
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

// const deleteProgress = async (user: UserAccount, progress: ProgressItem) => {
//   try {
//     const docRef = doc(db, "users", user.user_id, "progress", progress.date);
//     await deleteDoc(docRef);
//   } catch (error) {
//     console.log(error);
//     return { error: "Error deleting progress" };
//   }
// };

const updateFoodAction = async (
  food_id: string,
  field: string,
  action: string
) => {
  try {
    if (!food_id) throw new Error("No food_id found");
    const docRef = doc(db, "foods", food_id);
    if (action === "increment") {
      await updateDoc(docRef, {
        [field]: increment(1),
      });
    } else if (action === "decrement") {
      await updateDoc(docRef, {
        [field]: increment(-1),
      });
    } else {
      throw new Error("action invalid");
    }
  } catch (error) {
    return { error: `Error updating food ${food_id}: ${error}` };
  }
};

export {
  addFood,
  fetchFoods,
  updateFoodAction,
  fetchFoodByID,
  fetchFoodsByIDS,
};
