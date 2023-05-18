import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food, FoodGroup } from "@/types/foodTypes";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface FoodsSlice {
  foodsSearched: FoodGroup;
  basicFoodsSearched: FoodGroup;
  foodOpened: {
    food: Food | null;
    food_scale: {
      amount: number;
      weightName: string;
    };
  };
}

// Define the initial state using that type
const initialState: FoodsSlice = {
  foodsSearched: {},
  basicFoodsSearched: {},
  foodOpened: {
    food: null,
    food_scale: {
      amount: 1,
      weightName: "",
    },
  },
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
    setFoodOpened: (state, action: PayloadAction<Food | null>) => {
      state.foodOpened.food = action.payload;
    },
    setFoodOpenedScale: (
      state,
      action: PayloadAction<{ amount: number; weightName: string }>
    ) => {
      state.foodOpened.food_scale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setFoodsSearched,
  setBasicFoodsSearched,
  setFoodOpened,
  setFoodOpenedScale,
} = foodsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFoodsSlice = (state: RootState) => state.foods;

export default foodsSlice.reducer;
