import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../../services/firebase/firebase.config";
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

export { addFood };
