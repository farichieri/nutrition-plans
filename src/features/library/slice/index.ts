import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { Food, FoodGroup, FoodHit, FoodHitsGroup } from "@/features/foods";
import { Diet, DietGroup, DietMeal, DietMealGroup } from "@/features/plans";
import { RootState } from "@/lib/store";

interface LibraryState {
  libraryDiets: DietGroup;
  libraryFoods: FoodHitsGroup | FoodGroup;
  libraryMeals: DietMealGroup;
  isRating: boolean;
  isSearching: {
    diets: boolean;
    foods: boolean;
    meals: boolean;
  };
}

const initialState: LibraryState = {
  libraryDiets: {},
  libraryFoods: {},
  libraryMeals: {},
  isRating: false,
  isSearching: {
    diets: false,
    foods: false,
    meals: false,
  },
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibraryFoods: (state, action: PayloadAction<FoodHitsGroup>) => {
      state.libraryFoods = action.payload;
    },
    setLibraryDiets: (state, action: PayloadAction<DietGroup>) => {
      state.libraryDiets = action.payload;
    },
    setLibraryMeals: (state, action: PayloadAction<DietMealGroup>) => {
      state.libraryMeals = action.payload;
    },
    setIsSearching: (
      state,
      action: PayloadAction<{
        target: "foods" | "diets" | "meals";
        value: boolean;
      }>
    ) => {
      const { target, value } = action.payload;
      state.isSearching[target] = value;
    },
    setIsRating: (state, action: PayloadAction<boolean>) => {
      state.isRating = action.payload;
    },
    addFoodToLibrary: (state, action: PayloadAction<FoodHit | Food>) => {
      const { id } = action.payload;
      if (!id) return;
      state.libraryFoods[id] = action.payload;
    },
    addDietToLibrary: (state, action: PayloadAction<Diet>) => {
      const { id } = action.payload;
      if (!id) return;
      state.libraryDiets[id] = action.payload;
    },
    removeFoodFromLibrary: (state, action: PayloadAction<FoodHit | Food>) => {
      const { id: id } = action.payload;
      if (!id) return;
      delete state.libraryFoods[id];
    },
    removeDietFromLibrary: (state, action: PayloadAction<Diet>) => {
      const { id: id } = action.payload;
      if (!id) return;
      delete state.libraryDiets[id];
    },
    removeMealFromLibrary: (state, action: PayloadAction<DietMeal>) => {
      const { id: id } = action.payload;
      if (!id) return;
      delete state.libraryMeals[id];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  addDietToLibrary,
  addFoodToLibrary,
  removeDietFromLibrary,
  removeFoodFromLibrary,
  removeMealFromLibrary,
  setIsRating,
  setIsSearching,
  setLibraryDiets,
  setLibraryFoods,
  setLibraryMeals,
} = librarySlice.actions;

export const selectLibrarySlice = (state: RootState) => state.library;

export default librarySlice.reducer;
