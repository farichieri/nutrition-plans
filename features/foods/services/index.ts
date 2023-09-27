import {
  addFood,
  fetchFoods,
  fetchFoodsByIDS,
  FoodKind,
  setFoodsSearched,
  setPages,
  type Food,
  type FoodHitsGroup,
  fetchFoodsCreatedByUser,
  setIsSearchingFoods,
} from "@/features/foods";
import { api } from "@/services/api";
import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "@/features/authentication";
import type { FilterQueries } from "@/types";

export * from "./fetches";
export * from "./posts";

export const foodsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFoods: build.mutation<
      FoodHitsGroup,
      { queries: FilterQueries; user: User; createdByUser?: boolean }
    >({
      async queryFn({ queries, user, createdByUser }, { dispatch }) {
        try {
          dispatch(setIsSearchingFoods(true));
          if (createdByUser) {
            const res = await fetchFoodsCreatedByUser({
              queries,
              uploaderID: user?.id,
            });
            if (res.result === "error") throw new Error("Error fetching foods");
            dispatch(
              setFoodsSearched({ foods: res.data.hits, userID: user.id })
            );
            dispatch(setPages(res.data.pages));
            return { data: res.data.hits };
          } else {
            const res = await fetchFoods({ queries, uploaderID: user?.id });
            if (res.result === "error") throw new Error("Error fetching foods");
            dispatch(
              setFoodsSearched({ foods: res.data.hits, userID: user.id })
            );
            dispatch(setPages(res.data.pages));
            return { data: res.data.hits };
          }
        } catch (error) {
          dispatch(setFoodsSearched({ foods: {}, userID: user.id }));
          return { error };
        } finally {
          dispatch(setIsSearchingFoods(false));
        }
      },
    }),

    getFoodById: build.mutation<Food, { id: string }>({
      async queryFn({ id }) {
        try {
          const foodDoc = doc(db, "foods", id);
          const food = await getDoc(foodDoc);
          if (food.exists()) {
            return { data: food.data() as Food };
          } else {
            throw new Error("No such food exists.");
          }
        } catch (error) {
          return { error };
        }
      },
    }),

    getFoodsByIds: build.mutation<FoodHitsGroup, { ids: string[]; user: User }>(
      {
        async queryFn({ ids, user }, { dispatch }) {
          try {
            const res = await fetchFoodsByIDS(ids);
            if (res.result === "error") throw new Error("Error fetching foods");
            const data = res.data;
            dispatch(setFoodsSearched({ foods: data, userID: user.id }));

            return { data };
          } catch (error) {
            dispatch(setFoodsSearched({ foods: {}, userID: user.id }));
            return { error };
          }
        },
      }
    ),

    postFood: build.mutation<
      Food,
      { food: Food; kind: FoodKind; newImage: File | undefined; user: User }
    >({
      async queryFn({ food, kind, newImage, user }, { dispatch }) {
        try {
          const res = await addFood(food, kind, newImage, user);
          if (res.result === "error") throw new Error("Error adding food");
          const data = res.data;
          return { data };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
    }),

    getUSDAFood: build.mutation<Food, { fdcId: string }>({
      async queryFn({ fdcId }) {
        try {
          const response = await fetch("/api/usda/" + fdcId);
          const data = await response.json();
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useGetFoodsMutation,
  useGetFoodByIdMutation,
  useGetFoodsByIdsMutation,
  usePostFoodMutation,
  useGetUSDAFoodMutation,
} = foodsApi;
