import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet, NewDiet } from "@/types/dietTypes";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface DietCreate {
  dietState: Diet;
}

// Define the initial state using that type
const initialState: DietCreate = {
  dietState: NewDiet,
};

export const createDietSlice = createSlice({
  name: "createDiet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDietState: (state, action: PayloadAction<Diet>) => {
      state.dietState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setDietState } = createDietSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCreateDietSlice = (state: RootState) => state.createDiet;

export default createDietSlice.reducer;
