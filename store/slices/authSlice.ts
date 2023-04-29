import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { UserAccount } from "@/types/types";
import type { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
  user: UserAccount | null;
  isVerifyingUser: boolean;
  isCreatingUser: boolean;
  error: string | null;
  isSigningUser: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  isVerifyingUser: false,
  isCreatingUser: false,
  error: null,
  isSigningUser: false,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsVerifyingUser: (state) => {
      state.isVerifyingUser = true;
    },
    setUser: (state, action: PayloadAction<UserAccount | null>) => {
      state.user = action.payload;
      state.isVerifyingUser = false;
      state.isSigningUser = false;
    },
    setIsCreatingUser: (state, action: PayloadAction<boolean>) => {
      state.isCreatingUser = action.payload;
    },
    setIsSigningUser: (state, action: PayloadAction<boolean>) => {
      state.isSigningUser = action.payload;
    },
    setUpdateUser: (state, action: PayloadAction<UserAccount>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setIsVerifyingUser,
  setUser,
  setIsCreatingUser,
  setIsSigningUser,
  setUpdateUser,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice.reducer;
