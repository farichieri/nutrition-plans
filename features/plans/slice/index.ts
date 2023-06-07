import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DietGroup, Diet, PlanGeneratorTypes } from "@/features/plans/types";
import { getToday } from "@/utils/dateFormat";
import { PlansEnum } from "@/types";
import { PURGE } from "redux-persist";
import { RootState } from "@/store/store";

interface PlansSlice {
  date: string;
  plans: {
    [key in PlansEnum]: DietGroup;
  };
  diets: DietGroup;
  dietOpened: Diet | null;
  isGeneratingMeals: boolean;
  planGeneratorType: PlanGeneratorTypes;
  isEditingDiet: boolean;
}

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
  isGeneratingMeals: true,
  planGeneratorType: PlanGeneratorTypes.automated,
  isEditingDiet: false,
};

export const plansSlice = createSlice({
  name: "plans",
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
    setIsGeneratingMeals: (state, action: PayloadAction<boolean>) => {
      state.isGeneratingMeals = action.payload;
    },
    setPlanGeneratorType: (
      state,
      action: PayloadAction<PlanGeneratorTypes>
    ) => {
      state.planGeneratorType = action.payload;
    },
    setIsEditingDiet: (state, action: PayloadAction<boolean>) => {
      state.isEditingDiet = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setDiet,
  setDietOpened,
  setPlansDate,
  setIsGeneratingMeals,
  setPlanGeneratorType,
  setIsEditingDiet,
} = plansSlice.actions;

export const selectPlansSlice = (state: RootState) => state.plans;

export default plansSlice.reducer;
