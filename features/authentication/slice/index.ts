import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { RootState } from "@/store";
import { User } from "@/features/authentication";

interface AuthState {
  error: string | null;
  isCreatingUser: boolean;
  isSelectingPlan: boolean;
  isSigningUser: boolean;
  isTrialOver: boolean;
  isVerifyingUser: boolean;
  showInstallModal: boolean;
  subscription: any;
  trialDaysLeft: number;
  user: User | null;
}

const initialState: AuthState = {
  error: null,
  isCreatingUser: false,
  isSelectingPlan: false,
  isSigningUser: false,
  isTrialOver: false,
  isVerifyingUser: false,
  showInstallModal: true,
  subscription: null,
  trialDaysLeft: 0,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsVerifyingUser: (state) => {
      state.isVerifyingUser = true;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      const user = action.payload;
      state.user = user;
      state.isVerifyingUser = false;
      if (user) {
        state.isSigningUser = false;
        // if no user.completedAt, then userTrial is over
        const daysFromCreation = Math.floor(
          (Date.now() - new Date(user.completedAt).getTime()) / 86400000
        );
        const daysLeft = Math.max(7 - daysFromCreation);
        state.trialDaysLeft = daysLeft;
        state.isTrialOver = daysLeft <= 0;
      }
    },
    setIsCreatingUser: (state, action: PayloadAction<boolean>) => {
      state.isCreatingUser = action.payload;
    },
    setIsSigningUser: (state, action: PayloadAction<boolean>) => {
      state.isSigningUser = action.payload;
    },
    setUpdateUser: (
      state,
      action: PayloadAction<{ user: User; fields: Partial<User> }>
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
    setSubscription: (state, action: PayloadAction<any>) => {
      state.subscription = action.payload;
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
  setSubscription,
} = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice.reducer;
