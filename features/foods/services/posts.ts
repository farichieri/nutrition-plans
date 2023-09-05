import {
  DEFAULT_IMAGE,
  Food,
  FoodKind,
  FoodScales,
  ImageURLs,
} from "@/features/foods";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/services/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getFoodsCollectionLength } from "./fetches";
import { Result } from "@/types";
import { User } from "@/features/authentication";
import { uuidv4 } from "@firebase/util";
import { formatISO } from "date-fns";
import { getNutritionValues } from "@/utils";

const addFood = async (
  food: Food,
  kind: FoodKind,
  newImage: File | undefined,
  user: User
): Promise<Result<Food, unknown>> => {
  try {
    if (!food.name) throw new Error("No name provided");
    const docRef = doc(collection(db, "foods"));

    const imgRes = await getImageURLs({ file: newImage!, docId: docRef.id });
    if (imgRes.result === "error") throw new Error("Error getting image URLs");
    const imageURLs = imgRes.data;

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

    // update Scales:
    const scales: FoodScales = [];

    food.scales.forEach((scale, index) => {
      const uuid = uuidv4();
      if (index === 0) {
        scales.push({
          ...scale,
          id: uuid,
          isDefault: true,
        });
      } else {
        scales.push({
          ...scale,
          id: uuid,
          isDefault: false,
        });
      }
    });

    const defaultScaleName = scales[0].scaleName;
    const defaultScaleGrams = scales[0].scaleGrams;
    const defaultScaleAmount = scales[0].scaleAmount;

    const nutrientsUpdated = getNutritionValues(
      food,
      defaultScaleAmount,
      defaultScaleName
    );

    console.log({ nutrientsUpdated, food });

    const newFood: Food = {
      ...food,
      complexity: complexity,
      dateCreated: formatISO(new Date()),
      id: docRef.id,
      imageURL: imageURLs.resized_400x400,
      imageURLs: imageURLs,
      index: index,
      ingredientsAmount: numIngredients,
      ingredientsDescriptions: ingredientsDescriptions,
      ingredientsNames: ingredientsNames,
      kind: kind,
      nutrients: { ...nutrientsUpdated },
      scaleAmount: defaultScaleAmount,
      scaleName: defaultScaleName,
      scales: scales,
      servingGrams: defaultScaleGrams,
      servingName: defaultScaleName,
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

const getImageURLs = async ({
  file,
  docId,
}: {
  file: File;
  docId: string;
}): Promise<Result<ImageURLs, unknown>> => {
  try {
    // Upload original, then resize and get resized Urls:
    const publicURL = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/foods/${docId}/`;

    const imageURLs = {
      resized_100x100: publicURL + "resized_100x100",
      resized_1200x900: publicURL + "resized_1200x900",
      resized_200x200: publicURL + "resized_200x200",
      resized_400x400: publicURL + "resized_400x400",
      resized_680x680: publicURL + "resized_680x680",
    };

    let image = file || DEFAULT_IMAGE;

    const imageRef = ref(storage, `foods/${docId}/resized`);
    await uploadBytes(imageRef, image);

    return { result: "success", data: imageURLs };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { addFood };
