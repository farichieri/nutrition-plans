import {
  MealsSettings,
  UserMeal,
  UserMeals,
  NewMealSetting,
} from "@/types/mealsSettingsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface MealsSlice {
  meals: UserMeals;
  mealsSettings: MealsSettings;
  isLoadingMealsSettings: boolean;
  newMealState: UserMeal;
}

// Define the initial state using that type
const initialState: MealsSlice = {
  meals: {},
  mealsSettings: {},
  isLoadingMealsSettings: false,
  newMealState: NewMealSetting,
};

export const mealsSlice = createSlice({
  name: "meals",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserMeals: (state, action: PayloadAction<UserMeals>) => {
      state.meals = action.payload;
    },
    setAddNewUserMeal: (state, action: PayloadAction<UserMeal>) => {
      const id = action.payload.id;
      if (id) {
        state.meals[id] = action.payload;
      }
    },
    setDeleteUserMeal: (state, action: PayloadAction<UserMeal>) => {
      const id = action.payload.id;
      if (id) {
        delete state.meals[id];
      }
    },
    setUserMealsSettings: (state, action: PayloadAction<MealsSettings>) => {
      state.mealsSettings = action.payload;
      state.isLoadingMealsSettings = false;
    },
    setAddNewMealSetting: (state, action: PayloadAction<UserMeal>) => {
      const id = action.payload.id;
      if (id) {
        state.mealsSettings[id] = action.payload;
      }
    },
    setDeleteMealSetting: (state, action: PayloadAction<UserMeal>) => {
      const id = action.payload.id;
      if (id) {
        delete state.mealsSettings[id];
      }
    },
    setIsLoadingMealSettings: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMealsSettings = action.payload;
    },
    setNewMealState: (state, action: PayloadAction<UserMeal>) => {
      state.newMealState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setAddNewMealSetting,
  setAddNewUserMeal,
  setDeleteMealSetting,
  setDeleteUserMeal,
  setIsLoadingMealSettings,
  setNewMealState,
  setUserMeals,
  setUserMealsSettings,
} = mealsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMealsSlice = (state: RootState) => state.meals;

export default mealsSlice.reducer;
