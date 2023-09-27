import {
  ProgressItem,
  Progress,
  setProgress,
  setAddProgress,
  setDeleteProgress,
  setUpdateProgress,
} from "@/features/progress";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebase";
import { User } from "@/features/authentication";
import { api } from "@/services/api";

export const progressApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProgress: build.query<Progress, { user: User | null }>({
      async queryFn({ user }, { dispatch }) {
        console.log("Executing: getProgress");
        if (!user) return { data: {} };
        try {
          const progressRef = query(
            collection(db, "users", user.id, "progress")
          );
          const querySnapshot = await getDocs(progressRef);
          let data: Progress = {};
          querySnapshot.forEach((progress: any) => {
            data[progress.id] = progress.data();
          });
          dispatch(setProgress(data));
          return { data: data };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      providesTags: ["progress"],
    }),

    postProgress: build.mutation<
      ProgressItem,
      { progress: ProgressItem; user: User }
    >({
      async queryFn({ progress, user }, { dispatch }) {
        console.log("Executing: postProgress");
        try {
          const docRef = doc(db, "users", user.id, "progress", progress.date);
          await setDoc(docRef, progress);
          dispatch(setAddProgress(progress));
          return { data: progress };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["progress"],
    }),

    deleteProgress: build.mutation<
      boolean,
      { progress: ProgressItem; user: User }
    >({
      async queryFn({ progress, user }, { dispatch }) {
        console.log("Executing: deleteProgress");
        try {
          const docRef = doc(db, "users", user.id, "progress", progress.date);
          await deleteDoc(docRef);
          dispatch(setDeleteProgress(progress.date));
          return { data: true };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
      invalidatesTags: ["progress"],
    }),

    updateProgress: build.mutation<
      ProgressItem,
      { progress: ProgressItem; user: User }
    >({
      async queryFn({ progress, user }, { dispatch }) {
        console.log({ progress });
        console.log("Executing: updateProgress");
        try {
          const docRef = doc(db, "users", user.id, "progress", progress.date);
          await setDoc(docRef, progress);
          dispatch(setUpdateProgress(progress));
          return { data: progress };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useGetProgressQuery,
  usePostProgressMutation,
  useDeleteProgressMutation,
  useUpdateProgressMutation,
} = progressApi;
