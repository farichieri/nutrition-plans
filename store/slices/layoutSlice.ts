import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "@/types/types";
import type { RootState } from "../store";

// Define a type for the slice state
interface LayoutState {
  sidebarOpen: boolean;
  sidebarPlansOpen: boolean;
  sidebarEvolutionOpen: boolean;
  theme: Theme;
  isSettingsOpen: boolean;
  isBillingModalOpen: boolean;
}

// Define the initial state using that type
const initialState: LayoutState = {
  sidebarOpen: true,
  sidebarPlansOpen: true,
  sidebarEvolutionOpen: true,
  theme: Theme.light,
  isSettingsOpen: false,
  isBillingModalOpen: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSidebarPlansOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarPlansOpen = action.payload;
    },
    setSidebarEvolutionOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarEvolutionOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setIsSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingsOpen = action.payload;
    },
    setIsBillingModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isBillingModalOpen = action.payload;
    },
  },
});

export const {
  setSidebarOpen,
  setSidebarPlansOpen,
  setSidebarEvolutionOpen,
  setTheme,
  setIsBillingModalOpen,
  setIsSettingsOpen,
} = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLayoutSlice = (state: RootState) => state.layout;

export default layoutSlice.reducer;
