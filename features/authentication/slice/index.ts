import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { RootState } from "@/store/store";
import { UserAccount } from "@/features/authentication";

interface AuthState {
  user: UserAccount | null;
  isVerifyingUser: boolean;
  isCreatingUser: boolean;
  error: string | null;
  isSigningUser: boolean;
  isSelectingPlan: boolean;
}

const initialState: AuthState = {
  user: null,
  isVerifyingUser: false,
  isCreatingUser: false,
  error: null,
  isSigningUser: false,
  isSelectingPlan: false,
};

export const authSlice = createSlice({
  name: "auth",
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
    setIsSelectingPlan: (state, action: PayloadAction<boolean>) => {
      state.isSelectingPlan = action.payload;
    },
    setLoginError: (state) => {
      state.user = null;
      state.isSigningUser = false;
      state.isVerifyingUser = false;
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
  setLoginError,
  setIsSelectingPlan,
} = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice.reducer;
