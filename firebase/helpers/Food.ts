import { db, storage } from "../firebase.config";
import {
  collection,
  doc,
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
import { UserAccount } from "@/types/types";
import { Food, FoodGroup, FoodTypesEnum } from "@/types/foodTypes";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DEFAULT_IMAGE } from "@/types/initialTypes";

const addFood = async (
  user: UserAccount,
  food: Food,
  newImage: File | undefined
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
      kind: FoodTypesEnum.basic_food,
      food_id: docRef.id,
      user_id: user.user_id,
      food_name_lowercase: food.food_name.toLowerCase(),
      image: img,
    };
    console.log("Food created: ", newFood);
    await setDoc(docRef, newFood);
    return { food_id: docRef.id };
  } catch (error) {
    return { error: `Error creating Food: ${error}` };
  }
};

const fetchFoods = async (foodQuery: string) => {
  console.log(`Fetching Food ${foodQuery}`);
  try {
    let data: FoodGroup = {};
    const foodsRef = collection(db, "foods");
    const q = query(
      foodsRef,
      where("food_name_lowercase", ">=", `${foodQuery}`),
      where("food_name_lowercase", "<=", `${foodQuery}z`),
      limit(40)
    );
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

// const userRef = doc(db, "users", user.uid);
// console.log('getDoc: doc(db, "users", user.uid)');
// const querySnapshot = await getDoc(userRef);
// const userData = querySnapshot.data();

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

export { addFood, fetchFoods, updateFoodAction, fetchFoodByID };
