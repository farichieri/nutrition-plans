import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import type { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
  user: User | null;
  isVerifyingUser: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  isVerifyingUser: true,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsVerifyingUser: (state) => {
      state.isVerifyingUser = true;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isVerifyingUser = false;
    },
    setLogoutUser: (state) => {
      state.isVerifyingUser = false;
      state.user = null;
    },
  },
});

export const { setIsVerifyingUser, setUser, setLogoutUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice.reducer;
