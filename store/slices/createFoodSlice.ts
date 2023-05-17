import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@/types/foodTypes";
import { Meal, NewMeal } from "@/types/mealTypes";
import { NewFood } from "@/types/initialTypes";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface FoodCreate {
  foodState: Food;
  ingredientOpened: Food | null;
  mealState: Meal;
  recipeState: Food;
}

// Define the initial state using that type
const initialState: FoodCreate = {
  foodState: NewFood,
  ingredientOpened: null,
  mealState: NewMeal,
  recipeState: NewFood,
};

export const createFoodSlice = createSlice({
  name: "createFood",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFoodState: (state, action: PayloadAction<Food>) => {
      state.foodState = action.payload;
    },
    setRecipeState: (state, action: PayloadAction<Food>) => {
      state.recipeState = action.payload;
    },
    setMealState: (state, action: PayloadAction<Meal>) => {
      state.mealState = action.payload;
    },
    setIngredientOpened: (state, action: PayloadAction<Food | null>) => {
      state.ingredientOpened = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setFoodState,
  setRecipeState,
  setMealState,
  setIngredientOpened,
} = createFoodSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCreateFoodSlice = (state: RootState) => state.createFood;

export default createFoodSlice.reducer;
