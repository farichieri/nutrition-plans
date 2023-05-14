import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@/types/foodTypes";
import { NewFood } from "@/types/initialTypes";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface FoodCreate {
  foodState: Food;
}

// Define the initial state using that type
const initialState: FoodCreate = {
  foodState: NewFood,
};

export const createFoodSlice = createSlice({
  name: "createFood",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFoodState: (state, action: PayloadAction<Food>) => {
      state.foodState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFoodState } = createFoodSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCreateFoodSlice = (state: RootState) => state.createFood;

export default createFoodSlice.reducer;
