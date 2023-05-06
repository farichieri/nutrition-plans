import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodGroup } from "@/types/foodTypes";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface FoodsSlice {
  foodsSearched: FoodGroup;
  basicFoodsSearched: FoodGroup;
}

// Define the initial state using that type
const initialState: FoodsSlice = {
  foodsSearched: {},
  basicFoodsSearched: {},
};

export const foodsSlice = createSlice({
  name: "foods",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFoodsSearched: (state, action: PayloadAction<FoodGroup>) => {
      state.foodsSearched = action.payload;
    },
    setBasicFoodsSearched: (state, action: PayloadAction<FoodGroup>) => {
      state.basicFoodsSearched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFoodsSearched, setBasicFoodsSearched } = foodsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFoodsSlice = (state: RootState) => state.foods;

export default foodsSlice.reducer;
