import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import type { RootState } from "../store";

// Define a type for the slice state
interface LayoutState {
  sidebarOpen: boolean;
  allPlansOpen: boolean;
}

// Define the initial state using that type
const initialState: LayoutState = {
  sidebarOpen: true,
  allPlansOpen: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setAllPlansOpen: (state, action: PayloadAction<boolean>) => {
      state.allPlansOpen = action.payload;
    },
  },
});

export const { setSidebarOpen, setAllPlansOpen } = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLayoutSlice = (state: RootState) => state.layout;

export default layoutSlice.reducer;
