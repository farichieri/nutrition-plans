import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import type { RootState } from "../store";
import { UserAccount } from "@/types/types";

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
  isVerifyingUser: true,
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
    setLogoutUser: (state) => {
      state.isVerifyingUser = false;
      state.user = null;
    },
    setIsCreatingUser: (state, action: PayloadAction<boolean>) => {
      state.isCreatingUser = action.payload;
    },
    setIsSigningUser: (state, action: PayloadAction<boolean>) => {
      state.isSigningUser = action.payload;
    },
  },
});

export const {
  setIsVerifyingUser,
  setUser,
  setLogoutUser,
  setIsCreatingUser,
  setIsSigningUser,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice.reducer;
