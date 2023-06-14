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
import { RootState } from "@/store/store";
import { getDietNutrition, getIsWeek, getToday } from "@/utils";

interface PlansSlice {
  date: string;
  diets: DietGroup;
  isCreatingDiet: boolean;
  isEditingDiet: boolean;
  isGeneratingMeals: boolean;
  isLoadingDiet: boolean;
  isSavingDiet: boolean;
  planDateType: PlanDateType;
  planType: PlanTypes;
}

const initialState: PlansSlice = {
  date: getToday(),
  diets: {},
  isCreatingDiet: false,
  isEditingDiet: false,
  isGeneratingMeals: false,
  isLoadingDiet: true,
  isSavingDiet: false,
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
    setDiet: (state, action: PayloadAction<Diet>) => {
      const { plan_date, plan_id } = action.payload;
      if (plan_date && plan_id) {
        state.diets[plan_date] = action.payload;
      }
      state.isLoadingDiet = false;
    },
    addFoodToDiet: (
      state,
      action: PayloadAction<{ food: Food; dietMeal: DietMeal }>
    ) => {
      const { food, dietMeal } = action.payload;
      const { diet_id } = dietMeal;
      if (!diet_id) return;
      const diet = state.diets[diet_id];

      const dietMealFood: Food = {
        ...food,
        diet_meal_id: dietMeal.diet_meal_id,
        diet_id: diet_id,
      };
      if (!dietMeal.diet_meal_id) return;
      const dietMealFoods =
        diet.diet_meals[dietMeal.diet_meal_id].diet_meal_foods;
      diet.diet_meals[dietMeal.diet_meal_id].diet_meal_foods[
        food.food_id as keyof Food
      ] = {
        ...dietMealFoods,
        ...dietMealFood,
      };
    },
    removeFoodInDiet: (state, action: PayloadAction<Food>) => {
      const { food_id, diet_meal_id, diet_id } = action.payload;
      if (!diet_meal_id || !diet_id || !food_id) return;
      delete state.diets[diet_id].diet_meals[diet_meal_id].diet_meal_foods[
        food_id
      ];
    },
    updateFoodInDiet: (state, action: PayloadAction<Food>) => {
      const { diet_meal_id, food_id, diet_id } = action.payload;
      if (!diet_meal_id || !diet_id || !food_id) return;
      state.diets[diet_id].diet_meals[diet_meal_id].diet_meal_foods[food_id] =
        action.payload;
    },
    updateDietNutrition: (
      state,
      action: PayloadAction<{ diet_id: string }>
    ) => {
      const { diet_id } = action.payload;
      const diet = state.diets[diet_id];
      if (!diet) return;
      const dietNutrition = getDietNutrition(diet.diet_meals);
      state.diets[diet_id].diet_nutrition = dietNutrition;
    },
    updateDietMealFoodsOrder: (
      state,
      action: PayloadAction<{
        dietMeal: DietMeal;
        foodsArrayOrdered: FoodGroupArray;
      }>
    ) => {
      const { dietMeal, foodsArrayOrdered } = action.payload;
      const { diet_id, diet_meal_id } = dietMeal;
      if (!diet_id || !diet_meal_id) return;
      const diet = state.diets[diet_id];
      let foodsUpdated: FoodGroup = {};
      foodsArrayOrdered.map((food, index) => {
        if (!food.food_id) return;
        foodsUpdated[food.food_id] = {
          ...food,
          order: index,
          diet_meal_id: diet_meal_id,
        };
      });
      diet.diet_meals[diet_meal_id].diet_meal_foods = foodsUpdated;
    },
    toggleEatenFood: (
      state,
      action: PayloadAction<{ food: Food; value: boolean }>
    ) => {
      const { food, value } = action.payload;
      const { food_id, diet_meal_id, diet_id } = food;
      if (!diet_id || !diet_meal_id || !food_id) return;
      state.diets[diet_id].diet_meals[diet_meal_id].diet_meal_foods[
        food_id
      ].eaten = value;
    },
    setIsCreatingDiet: (state, action: PayloadAction<boolean>) => {
      state.isCreatingDiet = action.payload;
    },
    setDeleteDiet: (state, action: PayloadAction<Diet>) => {
      const { diet_id } = action.payload;
      if (diet_id) {
        delete state.diets[diet_id];
      }
    },
    setIsGeneratingMeals: (state, action: PayloadAction<boolean>) => {
      state.isGeneratingMeals = action.payload;
    },
    setPlanType: (state, action: PayloadAction<PlanTypes>) => {
      state.planType = action.payload;
    },
    setIsEditingDiet: (state, action: PayloadAction<boolean>) => {
      state.isEditingDiet = action.payload;
    },
    setIsSavingDiet: (state, action: PayloadAction<boolean>) => {
      state.isSavingDiet = action.payload;
    },
    setIsLoadingDiet: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDiet = action.payload;
    },
    setPlanDateType: (state, action: PayloadAction<PlanDateType>) => {
      state.planDateType = action.payload;
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
  setIsCreatingDiet,
  setIsEditingDiet,
  setIsGeneratingMeals,
  setIsLoadingDiet,
  setIsSavingDiet,
  setPlanDateType,
  setPlansDate,
  setPlanType,
  toggleEatenFood,
  updateDietMealFoodsOrder,
  updateDietNutrition,
  updateFoodInDiet,
} = plansSlice.actions;

export const selectPlansSlice = (state: RootState) => state.plans;

export default plansSlice.reducer;
