import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { RootState } from "@/store/store";
import { UserAccount } from "@/features/authentication";

interface AuthState {
  error: string | null;
  isCreatingUser: boolean;
  isSelectingPlan: boolean;
  isSigningUser: boolean;
  isVerifyingUser: boolean;
  showInstallModal: boolean;
  user: UserAccount | null;
}

const initialState: AuthState = {
  error: null,
  isCreatingUser: false,
  isSelectingPlan: false,
  isSigningUser: false,
  isVerifyingUser: false,
  showInstallModal: true,
  user: null,
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
      // state.isSigningUser = false;
    },
    setIsCreatingUser: (state, action: PayloadAction<boolean>) => {
      state.isCreatingUser = action.payload;
    },
    setIsSigningUser: (state, action: PayloadAction<boolean>) => {
      state.isSigningUser = action.payload;
    },
    setUpdateUser: (
      state,
      action: PayloadAction<{ user: UserAccount; fields: Partial<UserAccount> }>
    ) => {
      const { fields, user } = action.payload;
      if (fields) {
        state.user = {
          ...user,
          ...fields,
        };
      }
    },
    setIsSelectingPlan: (state, action: PayloadAction<boolean>) => {
      state.isSelectingPlan = action.payload;
    },
    setLoginError: (state) => {
      state.user = null;
      state.isSigningUser = false;
      state.isVerifyingUser = false;
    },
    setBeforeInstallState: (state, action: PayloadAction<boolean>) => {
      state.showInstallModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setBeforeInstallState,
  setIsCreatingUser,
  setIsSelectingPlan,
  setIsSigningUser,
  setIsVerifyingUser,
  setLoginError,
  setUpdateUser,
  setUser,
} = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice.reducer;
