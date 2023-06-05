import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { FoodGroup } from "@/features/foods";
import { RootState } from "@/store/store";

interface FavoritesState {
  favoriteFoods: FoodGroup;
  isSearchingFavoriteFoods: boolean;
}

const initialState: FavoritesState = {
  favoriteFoods: {},
  isSearchingFavoriteFoods: true,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoriteFoods: (state, action: PayloadAction<FoodGroup>) => {
      state.favoriteFoods = action.payload;
    },
    setIsSearchingFavoriteFoods: (state, action: PayloadAction<boolean>) => {
      state.isSearchingFavoriteFoods = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFavoriteFoods, setIsSearchingFavoriteFoods } =
  favoritesSlice.actions;

export const selectFavoritesSlice = (state: RootState) => state.favorites;

export default favoritesSlice.reducer;
