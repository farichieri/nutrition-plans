// import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { WebStorage } from "redux-persist/lib/types";
import authSlice from "./slices/authSlice";
import createFoodSlice from "./slices/createFoodSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import foodsSlice from "./slices/foodsSlice";
import layoutSlice from "./slices/layoutSlice";
import progressSlice from "./slices/progressSlice";
import createDietSlice from "./slices/createDietSlice";
import dietsSlice from "./slices/dietsSlice";

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
  version: 1,
  storage,
  whitelist: [
    "auth",
    "createFood",
    "foods",
    "layout",
    "progress",
    "createDiet",
    "diets",
  ],
};

const rootReducer = combineReducers({
  auth: authSlice,
  createDiet: createDietSlice,
  createFood: createFoodSlice,
  foods: foodsSlice,
  layout: layoutSlice,
  progress: progressSlice,
  diets: dietsSlice,
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
