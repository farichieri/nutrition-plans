import {
  collection,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase.config";
import { DEFAULT_IMAGE } from "@/types/initialTypes";
import { Food, FoodGroup, FoodKind } from "@/types/foodTypes";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PlansEnum, Result } from "@/types";
import { UserMeal, matchComplexity } from "@/features/meals";
import { UserAccount } from "@/features/authentication";

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
    let indexResponse = await getFoodsCollectionLength();
    const { result } = indexResponse;
    if (result === "error") throw Error;
    const index = indexResponse.data;

    const numIngredients = Object.keys(food.ingredients).length;
    const complexity = numIngredients + food.prep_time + food.cook_time * 0.2;

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
      num_ingredients: numIngredients,
      uploader: user.user_id,
      index: index,
      complexity: complexity,
      total_time: food.cook_time + food.prep_time,
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

const fetchRandomFoodByPlan = async (
  plan: PlansEnum,
  collLength: number,
  userMeal: UserMeal
): Promise<Result<Food, unknown>> => {
  try {
    let data: Food | null = null;
    const docRef = collection(db, "foods");
    const random = Math.round(collLength * Math.random());

    let q1 = query(
      docRef,
      where(`compatible_plans.${plan}`, "==", true),
      where("index", ">=", random),
      orderBy("index"),
      limit(1)
    );
    let q2 = query(
      docRef,
      where(`compatible_plans.${plan}`, "==", true),
      orderBy("index", "desc"),
      limit(1)
    );

    const fetchOne = async (q_selected: any) => {
      console.log(`Fetching Random Food by plan: '${plan}'`);
      const querySnapshot = await getDocs(q_selected);
      querySnapshot.forEach((food: any) => {
        data = food.data();
      });
    };

    await fetchOne(q1);
    if (!data) {
      await fetchOne(q2);
    }

    // Check Complexity
    const checkComplexity = () =>
      matchComplexity((data as Food).complexity, userMeal.complexity);
    if (data) {
      if (!checkComplexity()) {
        await fetchOne(q1);
      }
      if (!checkComplexity()) {
        await fetchOne(q2);
      }
    }

    if (!data) throw Error;
    return { result: "success", data };
  } catch (error) {
    console.log(`Error fetching Food: ${error}`);
    return { result: "error", error };
  }
};

export {
  addFood,
  fetchFoods,
  updateFoodAction,
  fetchFoodByID,
  fetchFoodsByIDS,
  fetchRandomFoodByPlan,
  getFoodsCollectionLength,
};
