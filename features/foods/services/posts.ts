import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "@/services/firebase/firebase.config";
import { DEFAULT_IMAGE } from "@/types/initialTypes";
import { Food, FoodKind } from "@/features/foods";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFoodsCollectionLength } from "./fetches";
import { Result } from "@/types";
import { UserAccount } from "@/features/authentication";
import { uuidv4 } from "@firebase/util";

const addFood = async (
  food: Food,
  kind: FoodKind,
  newImage: File | undefined,
  user: UserAccount
): Promise<Result<Food, unknown>> => {
  try {
    if (!food.food_name) throw new Error("No food_name provided");
    const docRef = doc(collection(db, "foods"));

    let img = DEFAULT_IMAGE;
    if (newImage) {
      const imgResponse = await uploadImage(newImage, docRef.id);
      if (imgResponse.result === "success") {
        img = imgResponse.data;
      }
    }

    let indexResponse = await getFoodsCollectionLength();
    const { result } = indexResponse;
    if (result === "error") throw new Error("Error getting index");
    const index = indexResponse.data;

    const numIngredients = Object.keys(food.ingredients).length;
    const complexity =
      1 + numIngredients + food.prep_time + food.cook_time * 0.2;

    // Add the default scale:
    const newScales = [...food.scales];
    const uuid = uuidv4();
    newScales.unshift({
      scale_name: food.serving_name,
      scale_amount: 1,
      scale_grams: food.serving_grams,
      is_default: true,
      id: uuid,
    });

    const newFood: Food = {
      ...food,
      complexity: complexity,
      date_created: serverTimestamp(),
      food_id: docRef.id,
      food_name_lowercase: food.food_name.toLowerCase(),
      image: img,
      index: index,
      kind: kind,
      num_ingredients: numIngredients,
      nutrients: { ...food.nutrients },
      scales: newScales,
      total_time: food.cook_time + food.prep_time,
      uploader_id: user.user_id,
    };
    await setDoc(docRef, newFood);
    return { result: "success", data: newFood };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

const uploadImage = async (
  file: File,
  food_id: string
): Promise<Result<string, unknown>> => {
  try {
    const storageRef = ref(storage, `foods/${food_id}/default_image`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    if (!imageUrl) throw new Error("Error getting ImageURL");
    return { result: "success", data: imageUrl };
  } catch (error) {
    return { result: "error", error };
  }
};

export { addFood };
