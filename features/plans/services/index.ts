import { api } from "@/services/api";
import { db } from "@/services/firebase";
import { Diet } from "../types";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { PlansEnum } from "@/types";
import { resetDiet } from "../utils";
import { User } from "@/features/authentication";
import { setDeleteDiet, setDiet } from "../slice";

export * from "./fetches";

export const plansApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDietByDate: build.query<Diet, { date: string; userID: string }>({
      async queryFn({ date, userID }, { dispatch }) {
        console.log("Executing: getDietByDate");
        try {
          const docRef = doc(db, "users", userID, "diets", date);
          const querySnapshot = await getDoc(docRef);
          const data: Diet = querySnapshot.data() as Diet;
          if (data) {
            dispatch(setDiet(data));
          } else {
            dispatch(setDiet({ date: date, id: undefined }));
            throw new Error("No diet found");
          }
          return { data: data };
        } catch (error) {
          console.log({ error });
          return { error: error };
        }
      },
      providesTags: ["plans"],
    }),

    refreshDietByDate: build.mutation<Diet, { date: string; userID: string }>({
      async queryFn({ date, userID }, { dispatch }) {
        console.log("Executing: refreshDietByDate");
        try {
          const docRef = doc(db, "users", userID, "diets", date);
          const querySnapshot = await getDoc(docRef);
          const data: Diet = querySnapshot.data() as Diet;
          if (data) {
            dispatch(setDiet(data));
          } else {
            dispatch(setDiet({ date: date, id: undefined }));
          }
          return { data: data };
        } catch (error) {
          console.log({ error });
          return { error: error };
        }
      },
    }),

    postDietToUserDiets: build.mutation<
      Diet,
      { diet: Diet; planID: PlansEnum; date: string; user: User }
    >({
      async queryFn({ diet, planID, date, user }, { dispatch }) {
        console.log("Executing: postDietToUserDiets");
        try {
          const docRef = doc(db, "users", user.id, "diets", date);
          const dietID = docRef.id;

          let dietMeals: any = {};
          for (let key in diet.meals) {
            dietMeals[key] = {
              ...diet.meals[key],
              dietID: dietID,
            };
          }

          let newDiet: Diet = {
            ...diet,
            date: date,
            planID: planID,
            id: dietID,
            userID: user.id,
            dateCreated: new Date().toISOString(),
            meals: dietMeals,
            nutrients: { ...diet.nutrients },
          };

          await setDoc(docRef, newDiet);
          dispatch(setDiet(newDiet));

          return { data: newDiet };
        } catch (error) {
          console.log({ error });
          return { error: error };
        }
      },
    }),

    updateDiet: build.mutation<Diet, { diet: Diet; noDispatch?: boolean }>({
      async queryFn({ diet, noDispatch }, { dispatch }) {
        console.log("Executing: updateDiet");
        // No dispatch for fast updates (toggles)
        try {
          if (!diet.userID || !diet.id) throw new Error("Invalid diet fields");
          const docRef = doc(db, "users", diet.userID, "diets", diet.id);

          diet = {
            ...diet,
            nutrients: { ...diet.nutrients },
          };
          await setDoc(docRef, diet);
          if (!noDispatch) {
            dispatch(setDiet(diet));
          }

          return { data: diet };
        } catch (error) {
          console.log({ error });
          return { error: error };
        }
      },
      // invalidatesTags: ["plans"],
    }),

    replaceDietWithLibraryDay: build.mutation<Diet, { diet: Diet }>({
      async queryFn({ diet }, { dispatch }) {
        console.log("Executing: replaceDietWithLibraryDay");
        try {
          if (!diet.userID || !diet.id) throw new Error("Invalid diet fields");
          const docRef = doc(db, "users", diet.userID, "diets", diet.id);

          const dietResseted = resetDiet({ diet, newDietID: diet.id });

          if (dietResseted.result === "error") throw Error;

          const dietUpdated: Diet = {
            ...dietResseted.data,
            date: diet.date,
            nutrients: { ...diet.nutrients },
          };

          await setDoc(docRef, dietUpdated);
          dispatch(setDiet(dietUpdated));

          return { data: diet };
        } catch (error) {
          console.log({ error });
          return { error: error };
        }
      },
    }),

    deleteDiet: build.mutation<Diet, { diet: Diet }>({
      async queryFn({ diet }, { dispatch }) {
        console.log("Executing: deleteDiet");
        try {
          const { userID: userID, id } = diet;
          if (!userID || !id) throw Error;
          const docRef = doc(db, "users", userID, "diets", id);

          await deleteDoc(docRef);
          dispatch(setDeleteDiet({ id: diet.id! }));

          return { data: diet };
        } catch (error) {
          console.log("deleteUserMeal", { error });
          return { error };
        }
      },
      invalidatesTags: ["plans"],
    }),

    saveDiet: build.mutation<Diet, { diet: Diet }>({
      async queryFn({ diet }, { dispatch }) {
        console.log("Executing: saveDiet");
        try {
          if (!diet.userID || !diet.id) throw new Error("Invalid diet fields");
          const docRef = doc(db, "users", diet.userID, "diets", diet.id);

          diet = {
            ...diet,
            nutrients: { ...diet.nutrients },
          };
          await setDoc(docRef, diet);
          dispatch(setDiet(diet));

          return { data: diet };
        } catch (error) {
          console.log({ error });
          return { error: error };
        }
      },
      // invalidatesTags: ["plans"],
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useGetDietByDateQuery,
  usePostDietToUserDietsMutation,
  useUpdateDietMutation,
  useReplaceDietWithLibraryDayMutation,
  useDeleteDietMutation,
  useSaveDietMutation,
  useRefreshDietByDateMutation,
} = plansApi;
