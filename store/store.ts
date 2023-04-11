// import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { WebStorage } from "redux-persist/lib/types";
import authSlice from "./slices/authSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import layoutSlice from "./slices/layoutSlice";

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
  whitelist: ["auth", "layout"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  layout: layoutSlice,
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
