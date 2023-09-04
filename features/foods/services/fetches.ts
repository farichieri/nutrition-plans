import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { searchClient } from "@/lib/typesense";
import getSearchParameters from "../utils/getSearchParameters";
import type { FilterQueries, Result } from "@/types";
import type { Food, FoodHitsGroup } from "@/features/foods";

const typesenseFoodsCollection =
  process.env.NEXT_PUBLIC_TYPESENSE_FOODS_COLLECTION_NAME!;

const fetchCuratedFoods = async ({
  queries,
}: {
  queries: FilterQueries;
}): Promise<Result<FoodHitsGroup, unknown>> => {
  try {
    let data: FoodHitsGroup = {};

    const searchParameters = getSearchParameters({ queries, isCurated: true });

    const res = await searchClient
      .collections(typesenseFoodsCollection)
      .documents()
      .search(searchParameters, {});

    const { hits } = res;
    if (!hits) {
      throw new Error("Error fetching foods.");
    }

    hits.forEach((hit: any) => {
      const { document } = hit;
      data[document.id] = document;
    });

    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchUserFoods = async ({
  queries,
  uploaderID,
}: {
  queries: FilterQueries;
  uploaderID?: string;
}): Promise<Result<FoodHitsGroup, unknown>> => {
  try {
    let data: FoodHitsGroup = {};

    const searchParameters = getSearchParameters({ queries, uploaderID });

    const res = await searchClient
      .collections(typesenseFoodsCollection)
      .documents()
      .search(searchParameters, {});

    const { hits } = res;
    if (!hits) {
      throw new Error("Error fetching foods.");
    }

    hits.forEach((hit: any) => {
      const { document } = hit;
      data[document.id] = document;
    });

    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoods = async ({
  queries,
  uploaderID,
}: {
  queries: FilterQueries;
  uploaderID?: string;
}): Promise<Result<FoodHitsGroup, unknown>> => {
  try {
    let data: FoodHitsGroup = {};

    const [curatedFoodsRes, userFoodsRes] = await Promise.all([
      fetchCuratedFoods({ queries }),
      fetchUserFoods({ queries, uploaderID }),
    ]);

    if (
      curatedFoodsRes.result === "success" &&
      userFoodsRes.result === "success"
    ) {
      const resData = { ...curatedFoodsRes.data, ...userFoodsRes.data };
      data = resData;
    } else {
      throw new Error("Error fetching foods.");
    }
    return { result: "success", data };
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return { result: "error", error };
  }
};

const fetchFoodByID = async (id: string): Promise<Result<Food, unknown>> => {
  console.log(`Fetching Food ${id}`);
  try {
    const foodRef = doc(db, "foods", id);
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
  ids: string[]
): Promise<Result<FoodHitsGroup, unknown>> => {
  console.log(`Fetching Food IDS ${ids}`);
  try {
    let data: FoodHitsGroup = {};

    const res = await searchClient
      .collections(typesenseFoodsCollection)
      .documents()
      .search(
        {
          q: "",
          query_by: "name",
          filter_by: `id: [${ids.join(",")}]`,
          sort_by: "likes:desc",
          page: 1,
          per_page: 40,
        },
        {}
      );

    const { hits } = res;
    if (!hits) {
      throw new Error("Error fetching foods.");
    }

    hits.forEach((hit: any) => {
      const { document } = hit;
      data[document.id] = document;
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

const getAllFoodsIds = async (): Promise<Result<string[], unknown>> => {
  try {
    let data: string[] = [];
    const foodsRef = collection(db, "foods");
    const querySnapshot = await getDocs(foodsRef);
    querySnapshot.forEach((food: any) => {
      data.push(food.id);
    });
    return { result: "success", data };
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
  getAllFoodsIds,
};
