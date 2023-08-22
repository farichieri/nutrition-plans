import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { Theme } from "@/types";
import { PURGE } from "redux-persist";

// Define a type for the slice state
interface LayoutState {
  isSettingsOpen: boolean;
  sidebarEvolutionOpen: boolean;
  sidebarAdminOpen: boolean;
  sidebarOpen: boolean;
  theme: Theme;
  rememberGoalDate: string; // ISO date string
  isSubscribeModalOpen: boolean;
}

// Define the initial state using that type
const initialState: LayoutState = {
  isSettingsOpen: false,
  sidebarEvolutionOpen: true,
  sidebarAdminOpen: true,
  sidebarOpen: false,
  theme: Theme.Light,
  rememberGoalDate: "",
  isSubscribeModalOpen: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
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
    setRememberGoalDate: (state, action: PayloadAction<string>) => {
      state.rememberGoalDate = action.payload;
    },
    setIsSubscribeModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSubscribeModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return {
        ...state,
        rememberGoalDate: "",
      };
    });
  },
});

export const {
  setIsSettingsOpen,
  setRememberGoalDate,
  setSidebarAdminOpen,
  setSidebarEvolutionOpen,
  setSidebarOpen,
  setTheme,
  setIsSubscribeModalOpen,
} = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLayoutSlice = (state: RootState) => state.layout;

export default layoutSlice.reducer;
