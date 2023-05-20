import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diet, DietGroup } from "@/types/dietTypes";
import { getToday } from "@/utils/dateFormat";
import { PlansEnum } from "@/types/types";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface PlansSlice {
  date: string;
  plans: {
    [key in PlansEnum]: DietGroup;
  };
  diets: DietGroup;
  dietOpened: Diet | null;
}

// Define the initial state using that type
const initialState: PlansSlice = {
  date: getToday(),
  plans: {
    balanced: {},
    vegetarian: {},
    gluten_free: {},
    mediterranean: {},
    low_carb: {},
  },
  diets: {},
  dietOpened: null,
};

export const plansSlice = createSlice({
  name: "plans",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDiet: (state, action: PayloadAction<Diet>) => {
      const plan_date = action.payload.plan_date;
      const plan_id = action.payload.plan_id;
      if (plan_date && plan_id) {
        state.plans[plan_id][plan_date] = action.payload;
      }
    },
    setDietOpened: (state, action: PayloadAction<Diet | null>) => {
      state.dietOpened = action.payload;
    },
    setPlansDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setDiet, setDietOpened, setPlansDate } = plansSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlansSlice = (state: RootState) => state.plans;

export default plansSlice.reducer;
