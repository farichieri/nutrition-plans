import { deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { MealsSettings, UserMeal, UserMeals } from "@/features/meals/types";
import {
  userMealDoc,
  userMealSettingDoc,
  userMealsCollection,
  userMealsSettingsCollection,
} from "../../../services/firebase";
import { User } from "@/features/authentication";
import { defaultMeals } from "../utils";
import { api } from "@/services/api";
import {
  setAddNewMealSetting,
  setAddNewUserMeal,
  setDeleteMealSetting,
  setDeleteUserMeal,
  setUserMeals,
  setUserMealsSettings,
} from "../slice";

export const mealsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMeals: build.query<UserMeals, { user: User | null }>({
      async queryFn({ user }, { dispatch }) {
        console.log("Executing: getMeals");
        if (!user) return { data: {} };
        try {
          let data: UserMeals = {};
          const userMealsRef = query(userMealsCollection(user.id));
          const querySnapshot = await getDocs(userMealsRef);
          querySnapshot.forEach((meal: any) => {
            data[meal.id] = meal.data();
          });
          dispatch(setUserMeals(data));
          return { data: data };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      providesTags: ["meals"],
    }),

    postUserMeal: build.mutation<UserMeal, { userMeal: UserMeal; user: User }>({
      async queryFn({ userMeal, user }, { dispatch }) {
        console.log("Executing: postUserMeal");
        try {
          const userMealRef = doc(userMealsCollection(user.id));
          const newMeal = {
            ...userMeal,
            id: userMealRef.id,
          };
          await setDoc(userMealRef, newMeal);
          dispatch(setAddNewUserMeal(newMeal));
          return { data: newMeal };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["meals"],
    }),

    deleteUserMeal: build.mutation<
      UserMeal,
      { userMeal: UserMeal; userMeals: UserMeals; user: User }
    >({
      async queryFn({ userMeal, userMeals, user }, { dispatch }) {
        console.log("Executing: deleteUserMeal");
        try {
          if (!user) throw Error("No user");
          if (!userMeal.id) throw Error("No userMeal.id");
          const docRef = userMealDoc({ userID: user.id, mealID: userMeal.id });
          await deleteDoc(docRef);
          dispatch(setDeleteUserMeal(userMeal));

          // Update order of remaining meals
          const mealsUpdated: UserMeals = { ...userMeals };
          delete mealsUpdated[userMeal.id];
          Object.values(mealsUpdated).forEach((meal, index) => {
            mealsUpdated[meal.id!] = {
              ...meal,
              order: index,
            };
          });
          const promises = Object.values(mealsUpdated).map(async (meal) => {
            const docRef = userMealDoc({
              userID: user.id,
              mealID: meal.id!,
            });
            await setDoc(docRef, meal);
          });

          await Promise.all(promises);

          return { data: userMeal };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["meals"],
    }),

    updateUserMeal: build.mutation<
      UserMeal,
      { userMeal: UserMeal; user: User }
    >({
      async queryFn({ userMeal, user }, { dispatch }) {
        console.log("Executing: updateUserMeal");
        try {
          if (!userMeal.id) throw Error("No userMeal.id");
          const docRef = userMealDoc({ userID: user.id, mealID: userMeal.id });
          await setDoc(docRef, userMeal);
          dispatch(setAddNewUserMeal(userMeal));
          return { data: userMeal };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["meals"],
    }),

    updateUserMealsOrder: build.mutation<
      UserMeals,
      { mealsOrdered: UserMeals; user: User }
    >({
      async queryFn({ mealsOrdered, user }, { dispatch }) {
        console.log("Executing: updateUserMealsOrder");
        try {
          const promises = Object.values(mealsOrdered).map(async (meal) => {
            const docRef = userMealDoc({
              userID: user.id,
              mealID: meal.id!,
            });
            await setDoc(docRef, meal);
          });
          await Promise.all(promises);
          // dispatch(setUserMeals(mealsUpdated));

          return { data: mealsOrdered };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["meals"],
    }),

    postDefaultUserMeals: build.mutation<UserMeals, { user: User }>({
      async queryFn({ user }, { dispatch }) {
        console.log("Executing: postDefaultUserMeals");
        try {
          let data: UserMeals = {};

          const promises = defaultMeals.map(async (meal, index) => {
            const userMealRef = userMealDoc({
              userID: user.id,
              mealID: meal.id!,
            });
            const newUserMeal = {
              ...meal,
              order: index,
              mealSettingId: meal.id,
            };
            await setDoc(userMealRef, newUserMeal);
            dispatch(setAddNewUserMeal(newUserMeal));
            data[newUserMeal.id!] = newUserMeal;
          });
          await Promise.all(promises);

          return { data: data };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["meals"],
    }),

    // Meals Settings
    getMealsSettings: build.query<UserMeals, { user: User | null }>({
      async queryFn({ user }, { dispatch }) {
        console.log("Executing: getMealsSettings");
        if (!user) return { data: {} };
        try {
          let data: MealsSettings = {};
          const mealsSettingsRef = query(userMealsSettingsCollection(user.id));
          const querySnapshot = await getDocs(mealsSettingsRef);
          querySnapshot.forEach((meal: any) => {
            data[meal.id] = meal.data();
          });
          dispatch(setUserMealsSettings(data));
          return { data: data };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      providesTags: ["mealsSettings"],
    }),

    postMealSetting: build.mutation<
      UserMeal,
      { mealSetting: UserMeal; user: User }
    >({
      async queryFn({ mealSetting, user }, { dispatch }) {
        console.log("Executing: postMealSetting");
        try {
          const newMealSettingRef = doc(userMealsSettingsCollection(user.id));
          const newMealSetting = {
            ...mealSetting,
            id: newMealSettingRef.id,
          };
          await setDoc(newMealSettingRef, newMealSetting);
          dispatch(setAddNewMealSetting(newMealSetting));

          return { data: newMealSetting };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["mealsSettings"],
    }),

    updateMealSetting: build.mutation<
      UserMeal,
      { mealSetting: UserMeal; user: User }
    >({
      async queryFn({ mealSetting, user }, { dispatch }) {
        console.log("Executing: updateMealSetting");
        try {
          if (!mealSetting.id) throw Error("No mealSetting.id");
          const docRef = userMealSettingDoc({
            userID: user.id,
            mealID: mealSetting.id,
          });
          await setDoc(docRef, mealSetting);
          dispatch(setAddNewMealSetting(mealSetting));
          return { data: mealSetting };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["mealsSettings"],
    }),

    deleteMealSetting: build.mutation<
      UserMeal,
      { mealSetting: UserMeal; user: User }
    >({
      async queryFn({ mealSetting, user }, { dispatch }) {
        console.log("Executing: deleteMealSetting");
        try {
          if (!user) throw Error("No user");
          if (!mealSetting.id) throw Error("No mealSetting.id");
          const docRef = userMealSettingDoc({
            userID: user.id,
            mealID: mealSetting.id,
          });
          await deleteDoc(docRef);
          dispatch(setDeleteMealSetting(mealSetting));
          return { data: mealSetting };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["mealsSettings"],
    }),

    postDefaultMealsSettings: build.mutation<UserMeals, { user: User }>({
      async queryFn({ user }, { dispatch }) {
        console.log("Executing: postDefaultMealsSettings");
        try {
          let data: UserMeals = {};
          const promises = defaultMeals.map(async (meal) => {
            const userMealSettingRef = userMealSettingDoc({
              userID: user.id,
              mealID: meal.id!,
            });
            await setDoc(userMealSettingRef, meal);
            data[meal.id!] = meal;
          });
          await Promise.all(promises);

          return { data: data };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["mealsSettings"],
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useDeleteMealSettingMutation,
  useDeleteUserMealMutation,
  useGetMealsQuery,
  useGetMealsSettingsQuery,
  usePostDefaultMealsSettingsMutation,
  usePostDefaultUserMealsMutation,
  usePostMealSettingMutation,
  usePostUserMealMutation,
  useUpdateMealSettingMutation,
  useUpdateUserMealMutation,
  useUpdateUserMealsOrderMutation,
} = mealsApi;
