import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

import authSlice from "@/features/authentication/slice";
import foodsSlice from "@/features/foods/slice";
import layoutSlice from "@/features/layout/slice";
import librarySlice from "@/features/library/slice";
import mealsSlice from "@/features/meals/slice";
import notificationsSlice from "@/features/notifications/slice";
import plansSlice from "@/features/plans/slice";
import progressSlice from "@/features/progress/slice";
import settingsSlice from "@/features/settings/slice";
import shoppingSlice from "@/features/shopping/slice";
import { api } from "@/services/api";

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
    "notifications",
    "auth",
    "foods",
    "layout",
    "library",
    "meals",
    "plans",
    "progress",
    "settings",
    "shopping",
  ],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
  foods: foodsSlice,
  layout: layoutSlice,
  library: librarySlice,
  meals: mealsSlice,
  notifications: notificationsSlice,
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
      }).concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store);
