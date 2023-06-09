import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food, FoodGroup } from "@/features/foods";
import { NewFood } from "@/types/initialTypes";
import { PURGE } from "redux-persist";
import { RootState } from "@/store/store";

interface FoodsSlice {
  foodsSearched: FoodGroup;
  myFoodsSearched: FoodGroup;
  isSearchingFoods: boolean;
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
  foodModal: Food | null;
}

const initialState: FoodsSlice = {
  foodsSearched: {},
  myFoodsSearched: {},
  isSearchingFoods: true,
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
  foodModal: null,
};

interface SearchedFoods {
  foods: FoodGroup;
  user_id: string;
}

export const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setFoodsSearched: (state, action: PayloadAction<SearchedFoods>) => {
      const { foods, user_id } = action.payload;
      const myFoodsSearched: FoodGroup = {};
      const allFoodsSearched: FoodGroup = {};
      for (const key in foods) {
        allFoodsSearched[key] = foods[key];
        if (foods[key].uploader_id === user_id) {
          myFoodsSearched[key] = foods[key];
        }
      }
      state.foodsSearched = allFoodsSearched;
      state.myFoodsSearched = myFoodsSearched;
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
    setIsSearchingFoods: (state, action: PayloadAction<boolean>) => {
      state.isSearchingFoods = action.payload;
    },
    setFoodModal: (state, action: PayloadAction<Food | null>) => {
      state.foodModal = action.payload;
    },
    setFoodModalScale: (
      state,
      action: PayloadAction<{ scale_amount: number; scale_name: string }>
    ) => {
      const { scale_amount, scale_name } = action.payload;
      if (!state.foodModal) return;
      state.foodModal.scale_amount = Number(scale_amount);
      state.foodModal.scale_name = scale_name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setFoodOpened,
  setFoodOpenedScale,
  setFoodsSearched,
  setFoodState,
  setIngredientOpened,
  setIsSearchingFoods,
  setMealState,
  setRecipeState,
  setFoodModal,
  setFoodModalScale,
} = foodsSlice.actions;

export const selectFoodsSlice = (state: RootState) => state.foods;

export default foodsSlice.reducer;
