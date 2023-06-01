import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food, FoodGroup } from "@/features/foods";
import { PURGE } from "redux-persist";
import { RootState } from "@/store/store";
import { NewFood } from "@/types/initialTypes";

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
  foodState: Food;
  ingredientOpened: Food | null;
  mealState: Food;
  recipeState: Food;
}

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
  foodState: NewFood,
  ingredientOpened: null,
  mealState: NewFood,
  recipeState: NewFood,
};

export const foodsSlice = createSlice({
  name: "foods",
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
    setFoodState: (state, action: PayloadAction<Food>) => {
      state.foodState = action.payload;
    },
    setRecipeState: (state, action: PayloadAction<Food>) => {
      state.recipeState = action.payload;
    },
    setMealState: (state, action: PayloadAction<Food>) => {
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
  setFoodsSearched,
  setBasicFoodsSearched,
  setFoodOpened,
  setFoodOpenedScale,
  setFoodState,
  setRecipeState,
  setMealState,
  setIngredientOpened,
} = foodsSlice.actions;

export const selectFoodsSlice = (state: RootState) => state.foods;

export default foodsSlice.reducer;
