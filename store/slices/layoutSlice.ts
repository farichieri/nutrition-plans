import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { Theme } from "@/types";

// Define a type for the slice state
interface LayoutState {
  isBillingModalOpen: boolean;
  isSettingsOpen: boolean;
  sidebarEvolutionOpen: boolean;
  sidebarAdminOpen: boolean;
  sidebarOpen: boolean;
  sidebarPlansOpen: boolean;
  theme: Theme;
}

// Define the initial state using that type
const initialState: LayoutState = {
  isBillingModalOpen: false,
  isSettingsOpen: false,
  sidebarEvolutionOpen: true,
  sidebarAdminOpen: true,
  sidebarOpen: true,
  sidebarPlansOpen: true,
  theme: Theme.Light,
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
    setSidebarAdminOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarAdminOpen = action.payload;
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
  setIsBillingModalOpen,
  setIsSettingsOpen,
  setSidebarAdminOpen,
  setSidebarEvolutionOpen,
  setSidebarOpen,
  setSidebarPlansOpen,
  setTheme,
} = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLayoutSlice = (state: RootState) => state.layout;

export default layoutSlice.reducer;
