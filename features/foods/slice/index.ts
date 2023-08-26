import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food, Recipe, FoodHit, FoodHitsGroup } from "@/features/foods";
import { NewFood } from "@/features/foods/types";
import { PURGE } from "redux-persist";
import { RootState } from "@/store";

interface FoodsSlice {
  foodsSearched: FoodHitsGroup;
  myFoodsSearched: FoodHitsGroup;
  isSearchingFoods: boolean;
  foodOpened: {
    food: Food | null;
    food_scale: {
      amount: number;
      weightName: string;
    };
  };
  newFoodState: Food;
  ingredientOpened: Food | null;
  mealState: Food;
  newRecipeState: Recipe;
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
  newFoodState: NewFood,
  ingredientOpened: null,
  mealState: NewFood,
  newRecipeState: NewFood,
  foodModal: null,
};

interface SearchedFoods {
  foods: FoodHitsGroup;
  userID: string;
}

export const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setFoodsSearched: (state, action: PayloadAction<SearchedFoods>) => {
      const { foods, userID } = action.payload;
      const myFoodsSearched: FoodHitsGroup = {};
      const allFoodsSearched: FoodHitsGroup = {};
      for (const key in foods) {
        allFoodsSearched[key] = foods[key];
        if (foods[key].uploaderID === userID) {
          myFoodsSearched[key] = foods[key];
        }
      }
      state.foodsSearched = allFoodsSearched;
      state.myFoodsSearched = myFoodsSearched;
    },
    addNewFood: (state, action: PayloadAction<FoodHit>) => {
      const { id } = action.payload;
      if (!id) return;
      state.foodsSearched[id] = action.payload;
      state.myFoodsSearched[id] = action.payload;
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
    setNewFoodState: (state, action: PayloadAction<Food>) => {
      state.newFoodState = { ...action.payload };
    },
    updateNewFoodState: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      if (Array.isArray(value)) {
        state.newFoodState[field] = [...value];
      } else if (typeof value === "object") {
        state.newFoodState[field] = { ...value };
      } else {
        state.newFoodState[field] = value;
      }
    },
    updateNewRecipeState: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      if (Array.isArray(value)) {
        state.newRecipeState[field] = [...value];
      } else if (typeof value === "object") {
        state.newRecipeState[field] = { ...value };
      } else {
        state.newRecipeState[field] = value;
      }
    },
    setNewRecipeState: (state, action: PayloadAction<Food>) => {
      state.newRecipeState = action.payload;
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
      action: PayloadAction<{ scaleAmount: number; scaleName: string }>
    ) => {
      const { scaleAmount, scaleName } = action.payload;
      if (!state.foodModal) return;
      state.foodModal.scaleAmount = Number(scaleAmount);
      state.foodModal.scaleName = scaleName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  addNewFood,
  setFoodModal,
  setFoodModalScale,
  setFoodOpened,
  setFoodOpenedScale,
  setFoodsSearched,
  setIngredientOpened,
  setIsSearchingFoods,
  setMealState,
  setNewFoodState,
  setNewRecipeState,
  updateNewFoodState,
  updateNewRecipeState,
} = foodsSlice.actions;

export const selectFoodsSlice = (state: RootState) => state.foods;

export default foodsSlice.reducer;
