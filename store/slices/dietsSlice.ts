import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet, DietGroup } from "@/types/dietTypes";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface DietsSlice {
  diets: DietGroup;
  dietOpened: Diet | null;
}

// Define the initial state using that type
const initialState: DietsSlice = {
  diets: {},
  dietOpened: null,
};

export const dietsSlice = createSlice({
  name: "diets",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDiet: (state, action: PayloadAction<DietGroup>) => {
      // const diet_id = action.payload.diet_id;
      // if (diet_id) state.diets[diet_id] = action.payload;
      state.diets = action.payload;
    },
    setDietOpened: (state, action: PayloadAction<Diet>) => {
      state.dietOpened = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setDiet, setDietOpened } = dietsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDietsSlice = (state: RootState) => state.diets;

export default dietsSlice.reducer;
