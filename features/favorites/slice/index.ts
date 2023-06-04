import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { FoodGroup } from "@/features/foods";
import { RootState } from "@/store/store";

interface FavoritesState {
  favoriteFoods: FoodGroup;
}

// Define the initial state using that type
const initialState: FavoritesState = {
  favoriteFoods: {},
};

export const favoritesSlice = createSlice({
  name: "favorites",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFavoriteFoods: (state, action: PayloadAction<FoodGroup>) => {
      state.favoriteFoods = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFavoriteFoods } = favoritesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFavoritesSlice = (state: RootState) => state.favorites;

export default favoritesSlice.reducer;
