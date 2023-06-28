// import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { WebStorage } from "redux-persist/lib/types";
import authSlice from "@/features/authentication/slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import favoritesSlice from "@/features/favorites/slice";
import foodsSlice from "@/features/foods/slice";
import layoutSlice from "./slices/layoutSlice";
import mealsSlice from "@/features/meals/slice";
import plansSlice from "@/features/plans/slice";
import progressSlice from "@/features/progress/slice";
import settingsSlice from "@/features/settings/slice";

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === "undefined";

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStorage();

const persistConfig = {
  key: "root",
  version: 0,
  storage,
  whitelist: [
    "auth",
    "foods",
    "layout",
    "progress",
    "createDiet",
    "meals",
    "favorites",
  ],
};

const rootReducer = combineReducers({
  auth: authSlice,
  plans: plansSlice,
  favorites: favoritesSlice,
  foods: foodsSlice,
  layout: layoutSlice,
  meals: mealsSlice,
  progress: progressSlice,
  settings: settingsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
