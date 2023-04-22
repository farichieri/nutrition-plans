import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Progress, ProgressItem } from "@/types/types";
import type { RootState } from "../store";

interface ProgressState {
  progress: Progress;
  progressOpen: ProgressItem | null;
}

// Define the initial state using that type
const initialState: ProgressState = {
  progress: {},
  progressOpen: null,
};

export const authSlice = createSlice({
  name: "progress",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<Progress>) => {
      state.progress = action.payload;
    },
    setAddProgress: (state, action: PayloadAction<ProgressItem>) => {
      state.progress[action.payload.date] = action.payload;
    },
    setDeleteProgress: (state, action: PayloadAction<string>) => {
      delete state.progress[action.payload];
    },
    setUpdateProgress: (state, action: PayloadAction<ProgressItem>) => {
      state.progress[action.payload.date] = action.payload;
    },
    setProgressOpen: (state, action: PayloadAction<ProgressItem | null>) => {
      state.progressOpen = action.payload;
    },
  },
});

export const {
  setProgress,
  setAddProgress,
  setDeleteProgress,
  setUpdateProgress,
  setProgressOpen,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProgressSlice = (state: RootState) => state.progress;

export default authSlice.reducer;
