import {
  collection,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ALGOLIA_FOODS_INDEX_NAME, algoliaClient } from "@/lib/algolia";
import { db } from "@/services/firebase/firebase.config";
import { Food, FoodGroup } from "@/features/foods";
import { Result } from "@/types";

const fetchCuratedFoods = async ({
  food_name,
}: {
  food_name: string;
}): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching CuratedFoods by name: '${food_name}'`);
  // I'm sorting and filtering by the returned value.
  try {
    let data: FoodGroup = {};
    const index = algoliaClient.initIndex(ALGOLIA_FOODS_INDEX_NAME);
    const res = await index.search(food_name, {
      filters: "curated:true",
      hitsPerPage: 40,
    });
    console.log({ res });
    if (res.hits.length === 0) {
      throw new Error("No foods found");
    }

    res.hits.forEach((food: any) => {
      data[food.objectID] = food;
    });

    console.log("fetchCuratedFoods", { data });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchUserFoods = async ({
  food_name,
  uploader_id,
}: {
  food_name: string;
  uploader_id?: string;
}): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching UserFoods by name: '${food_name}'`);
  // I'm sorting and filtering by the returned value.
  try {
    let data: FoodGroup = {};
    const index = algoliaClient.initIndex(ALGOLIA_FOODS_INDEX_NAME);
    const res = await index.search(food_name, {
      filters: `uploader_id:${uploader_id}`,
      hitsPerPage: 40,
    });

    res.hits.forEach((food: any) => {
      data[food.objectID] = food;
    });

    console.log("fetchUserFoods", { data });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoods = async ({
  food_name,
  uploader_id,
}: {
  food_name: string;
  uploader_id?: string;
}): Promise<Result<FoodGroup, unknown>> => {
  console.log(`Fetching Foods by name: '${food_name}'`);
  try {
    console.log({ food_name });
    let data: FoodGroup = {};

    const [curatedFoodsRes, userFoodsRes] = await Promise.all([
      fetchCuratedFoods({ food_name }),
      fetchUserFoods({ food_name, uploader_id }),
    ]);

    if (
      curatedFoodsRes.result === "success" &&
      userFoodsRes.result === "success"
    ) {
      const resData = { ...curatedFoodsRes.data, ...userFoodsRes.data };
      const algoliaIDs = Object.keys(resData);
      const firebaseDocs = await fetchFoodsByIDS(algoliaIDs);

      if (firebaseDocs.result === "success") {
        data = firebaseDocs.data;
      } else {
        throw new Error("Error fetching foods.");
      }
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
