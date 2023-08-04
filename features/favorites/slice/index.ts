import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet, DietGroup, DietMeal, DietMealGroup } from "@/features/plans";
import { Food, FoodGroup } from "@/features/foods";
import { PURGE } from "redux-persist";
import { RootState } from "@/store";

interface FavoritesState {
  favoriteFoods: FoodGroup;
  favoritePlans: DietGroup;
  favoriteMeals: DietMealGroup;
  isRating: boolean;
  isSearchingFavoriteFoods: boolean;
  isSearchingFavoritePlans: boolean;
  isSearchingFavoriteMeals: boolean;
}

const initialState: FavoritesState = {
  favoriteFoods: {},
  favoritePlans: {},
  favoriteMeals: {},
  isRating: false,
  isSearchingFavoriteFoods: true,
  isSearchingFavoritePlans: true,
  isSearchingFavoriteMeals: true,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoriteFoods: (state, action: PayloadAction<FoodGroup>) => {
      state.favoriteFoods = action.payload;
    },
    setFavoritePlans: (state, action: PayloadAction<DietGroup>) => {
      state.favoritePlans = action.payload;
    },
    setFavoriteMeals: (state, action: PayloadAction<DietMealGroup>) => {
      state.favoriteMeals = action.payload;
    },
    setIsSearchingFavoriteFoods: (state, action: PayloadAction<boolean>) => {
      state.isSearchingFavoriteFoods = action.payload;
    },
    setIsSearchingFavoritePlans: (state, action: PayloadAction<boolean>) => {
      state.isSearchingFavoritePlans = action.payload;
    },
    setIsSearchingFavoriteMeals: (state, action: PayloadAction<boolean>) => {
      state.isSearchingFavoriteMeals = action.payload;
    },
    setIsRating: (state, action: PayloadAction<boolean>) => {
      state.isRating = action.payload;
    },
    addFavoriteFood: (state, action: PayloadAction<Food>) => {
      const { id } = action.payload;
      if (!id) return;
      state.favoriteFoods[id] = action.payload;
    },
    addFavoritePlan: (state, action: PayloadAction<Diet>) => {
      const { id } = action.payload;
      if (!id) return;
      state.favoritePlans[id] = action.payload;
    },
    removeFavoriteFood: (state, action: PayloadAction<Food>) => {
      const { id: id } = action.payload;
      if (!id) return;
      delete state.favoriteFoods[id];
    },
    removeFavoritePlan: (state, action: PayloadAction<Diet>) => {
      const { id: id } = action.payload;
      if (!id) return;
      delete state.favoritePlans[id];
    },
    removeFavoriteMeal: (state, action: PayloadAction<DietMeal>) => {
      const { id: id } = action.payload;
      if (!id) return;
      delete state.favoriteMeals[id];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  addFavoriteFood,
  addFavoritePlan,
  removeFavoriteFood,
  removeFavoriteMeal,
  removeFavoritePlan,
  setFavoriteFoods,
  setFavoriteMeals,
  setFavoritePlans,
  setIsRating,
  setIsSearchingFavoriteFoods,
  setIsSearchingFavoriteMeals,
  setIsSearchingFavoritePlans,
} = favoritesSlice.actions;

export const selectFavoritesSlice = (state: RootState) => state.favorites;

export default favoritesSlice.reducer;
