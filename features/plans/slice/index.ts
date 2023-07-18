import {
  DietGroup,
  Diet,
  PlanTypes,
  DietMeal,
  PlanDateType,
} from "@/features/plans/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food, FoodGroup, FoodGroupArray } from "@/features/foods/types";
import { PURGE } from "redux-persist";
import { RootState } from "@/store";
import { getDietNutrition, getIsWeek, getToday } from "@/utils";

interface PlansSlice {
  date: string;
  diets: DietGroup;
  isGeneratingMeals: boolean;
  planDateType: PlanDateType;
  planType: PlanTypes;
}

const initialState: PlansSlice = {
  date: "getToday()",
  diets: {},
  isGeneratingMeals: false,
  planDateType: PlanDateType.day,
  planType: PlanTypes.automatically,
};

export const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlansDate: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      state.date = date;
      if (getIsWeek(date)) {
        state.planDateType = PlanDateType.week;
      } else {
        state.planDateType = PlanDateType.day;
      }
    },
    setDiets: (state, action: PayloadAction<DietGroup>) => {
      const diets = action.payload;
      for (let key in diets) {
        const diet = diets[key];
        const { date, planID: plan_id } = diet;
        if (date && plan_id) {
          state.diets[date] = diet;
        }
      }
    },
    setDiet: (state, action: PayloadAction<Diet>) => {
      const { date, id } = action.payload;
      if (date && id) {
        state.diets[date] = action.payload;
      } else if (date && !id) {
        delete state.diets[date];
      }
    },
    setDeleteDiet: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (id) {
        delete state.diets[id];
      }
    },
    addFoodToDiet: (
      state,
      action: PayloadAction<{ food: Food; dietMeal: DietMeal }>
    ) => {
      const { food, dietMeal } = action.payload;
      const { dietID } = dietMeal;
      if (!dietID) return;
      const diet = state.diets[dietID];

      const dietMealFood: Food = {
        ...food,
        dietMealID: dietMeal.id,
        dietID: dietID,
      };
      if (!dietMeal.id) return;
      const dietMealFoods = diet.meals[dietMeal.id].foods;
      diet.meals[dietMeal.id].foods[food.id as keyof Food] = {
        ...dietMealFoods,
        ...dietMealFood,
      };
    },
    removeFoodInDiet: (state, action: PayloadAction<Food>) => {
      const { id, dietMealID, dietID } = action.payload;
      if (!dietMealID || !dietID || !id) return;
      delete state.diets[dietID].meals[dietMealID].foods[id];
    },
    updateFoodInDiet: (state, action: PayloadAction<Food>) => {
      const { dietMealID, id: id, dietID } = action.payload;
      if (!dietMealID || !dietID || !id) return;
      state.diets[dietID].meals[dietMealID].foods[id] = action.payload;
    },
    updateDietNutrition: (state, action: PayloadAction<{ dietID: string }>) => {
      const { dietID } = action.payload;
      const diet = state.diets[dietID];
      if (!diet) return;
      const dietNutrition = getDietNutrition(diet.meals);
      state.diets[dietID].nutrients = dietNutrition;
    },
    updateDietMealFoodsOrder: (
      state,
      action: PayloadAction<{
        dietMeal: DietMeal;
        foodsArrayOrdered: FoodGroupArray;
      }>
    ) => {
      const { dietMeal, foodsArrayOrdered } = action.payload;
      const { dietID, id } = dietMeal;
      if (!dietID || !id) return;
      const diet = state.diets[dietID];
      let foodsUpdated: FoodGroup = {};
      foodsArrayOrdered.map((food, index) => {
        if (!food.id) return;
        foodsUpdated[food.id] = {
          ...food,
          order: index,
          dietMealID: id,
        };
      });
      diet.meals[id].foods = foodsUpdated;
    },
    toggleEatenFood: (
      state,
      action: PayloadAction<{ food: Food; value: boolean }>
    ) => {
      const { food, value } = action.payload;
      const { id: id, dietMealID, dietID } = food;
      if (!dietID || !dietMealID || !id) return;
      state.diets[dietID].meals[dietMealID].foods[id].isEaten = value;
    },
    toggleDrunkWater: (
      state,
      action: PayloadAction<{ diet: Diet; value: boolean }>
    ) => {
      const { diet, value } = action.payload;
      const { water, id } = diet;
      // const { drunk, litters_drunk, litters_to_drink } = diet_water;
      if (!id) return;
      state.diets[id].water.drunk = value;
    },
    setIsGeneratingMeals: (state, action: PayloadAction<boolean>) => {
      state.isGeneratingMeals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  addFoodToDiet,
  removeFoodInDiet,
  setDeleteDiet,
  setDiet,
  setDiets,
  setIsGeneratingMeals,
  setPlansDate,
  toggleDrunkWater,
  toggleEatenFood,
  updateDietMealFoodsOrder,
  updateDietNutrition,
  updateFoodInDiet,
} = plansSlice.actions;

export const selectPlansSlice = (state: RootState) => state.plans;

export default plansSlice.reducer;
