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
import { db } from "@/services/firebase/firebase.config";
import { FilterQueries, Result } from "@/types";
import { Food, FoodGroup } from "@/features/foods";
import { searchClient } from "@/lib/typesense";
import getSearchParameters from "../utils/getSearchParameters";

const fetchCuratedFoods = async ({
  queries,
}: {
  queries: FilterQueries;
}): Promise<Result<FoodGroup, unknown>> => {
  try {
    let data: FoodGroup = {};

    const searchParameters = getSearchParameters({ queries, curated: true });
    console.log("asd", { searchParameters });

    const res = await searchClient
      .collections("foods")
      .documents()
      .search(searchParameters, {});

    const { hits } = res;
    if (!hits) {
      throw new Error("Error fetching foods.");
    }

    hits.forEach((hit: any) => {
      const { document } = hit;
      data[document.food_id] = document;
    });

    console.log("fetchCuratedFoods", { data });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchUserFoods = async ({
  queries,
  uploader_id,
}: {
  queries: FilterQueries;
  uploader_id?: string;
}): Promise<Result<FoodGroup, unknown>> => {
  try {
    let data: FoodGroup = {};

    const searchParameters = getSearchParameters({ queries, uploader_id });
    console.log("wessd", { searchParameters });

    const res = await searchClient
      .collections("foods")
      .documents()
      .search(searchParameters, {});

    console.log({ res });

    const { hits } = res;
    if (!hits) {
      throw new Error("Error fetching foods.");
    }

    hits.forEach((hit: any) => {
      const { document } = hit;
      data[document.food_id] = document;
    });

    console.log("fetchUserFoods", { data });
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoods = async ({
  queries,
  uploader_id,
}: {
  queries: FilterQueries;
  uploader_id?: string;
}): Promise<Result<FoodGroup, unknown>> => {
  try {
    let data: FoodGroup = {};

    const [curatedFoodsRes, userFoodsRes] = await Promise.all([
      fetchCuratedFoods({ queries }),
      fetchUserFoods({ queries, uploader_id }),
    ]);

    if (
      curatedFoodsRes.result === "success" &&
      userFoodsRes.result === "success"
    ) {
      const resData = { ...curatedFoodsRes.data, ...userFoodsRes.data };
      data = resData;
      // console.log({resData})
      // const typesenseIDS = Object.keys(resData);
      // const firebaseDocs = await fetchFoodsByIDS(typesenseIDS);

      // if (firebaseDocs.result === "success") {
      //   data = firebaseDocs.data;
      // } else {
      //   throw new Error("Error fetching foods.");
      // }
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
