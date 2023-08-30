import {
  DEFAULT_IMAGE,
  Food,
  FoodKind,
  getScalesWithPrimaryScales,
} from "@/features/foods";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFoodsCollectionLength } from "./fetches";
import { Result } from "@/types";
import { User } from "@/features/authentication";
import { uuidv4 } from "@firebase/util";
import { formatISO } from "date-fns";

const addFood = async (
  food: Food,
  kind: FoodKind,
  newImage: File | undefined,
  user: User
): Promise<Result<Food, unknown>> => {
  try {
    if (!food.name) throw new Error("No name provided");
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

    const ingredients = food.ingredients;
    const numIngredients = Object.keys(ingredients).length;
    const complexity = 1 + numIngredients + food.prepTime + food.cookTime * 0.2;

    // Add the ingredients names and descriptions to the food:
    let ingredientsNames: string[] = [];
    let ingredientsDescriptions: string[] = [];
    if (numIngredients > 0) {
      for (let key in ingredients) {
        ingredientsNames.push(ingredients[key].name!);
        ingredientsDescriptions.push(ingredients[key].description!);
      }
    }

    // Add the default scale:
    const newScales = getScalesWithPrimaryScales({ scales: food.scales });
    const uuid = uuidv4();
    const scaleName = food.servingName;
    const scaleAmount = 1;
    newScales.unshift({
      scaleName: scaleName,
      scaleAmount: scaleAmount,
      scaleGrams: food.servingGrams,
      isDefault: true,
      id: uuid,
    });

    const newFood: Food = {
      ...food,
      complexity: complexity,
      dateCreated: formatISO(new Date()),
      id: docRef.id,
      imageURL: img,
      index: index,
      ingredientsDescriptions: ingredientsDescriptions,
      ingredientsNames: ingredientsNames,
      kind: kind,
      ingredientsAmount: numIngredients,
      nutrients: { ...food.nutrients },
      scaleAmount: scaleAmount,
      scaleName: scaleName,
      scales: newScales,
      totalTime: food.cookTime + food.prepTime,
      uploaderID: user.id,
    };
    console.log({ newFood });
    await setDoc(docRef, newFood);
    return { result: "success", data: newFood };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

const uploadImage = async (
  file: File,
  id: string
): Promise<Result<string, unknown>> => {
  try {
    const storageRef = ref(storage, `foods/${id}/default_image`);
    await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(storageRef);
    if (!imageURL) throw new Error("Error getting ImageURL");
    return { result: "success", data: imageURL };
  } catch (error) {
    return { result: "error", error };
  }
};

export { addFood };
