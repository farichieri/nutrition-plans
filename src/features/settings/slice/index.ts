import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { RootState } from "@/lib/store";

interface SettingsState {
  isSettingAvatar: boolean;
}

// Define the initial state using that type
const initialState: SettingsState = {
  isSettingAvatar: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsSettingAvatar: (state, action: PayloadAction<boolean>) => {
      state.isSettingAvatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setIsSettingAvatar } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSettingsSlice = (state: RootState) => state.settings;

export default settingsSlice.reducer;
