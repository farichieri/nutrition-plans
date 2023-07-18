// import storage from "redux-persist/lib/storage";
import { PreloadedState, combineReducers } from "@reduxjs/toolkit";
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
import shoppingSlice from "@/features/shopping/slice";

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
    "favorites",
    "foods",
    "layout",
    "meals",
    "plans",
    "progress",
    "shopping",
    "settings",
  ],
};

const rootReducer = combineReducers({
  auth: authSlice,
  favorites: favoritesSlice,
  foods: foodsSlice,
  layout: layoutSlice,
  meals: mealsSlice,
  plans: plansSlice,
  progress: progressSlice,
  settings: settingsSlice,
  shopping: shoppingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store);
