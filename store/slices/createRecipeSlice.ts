import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "@/types/foodTypes";
import { NewFood } from "@/types/initialTypes";
import { PURGE } from "redux-persist";
import type { RootState } from "../store";

// Define a type for the slice state
interface RecipeCreate {
  recipeState: Food;
  ingredientOpened: Food | null;
}

// Define the initial state using that type
const initialState: RecipeCreate = {
  recipeState: NewFood,
  ingredientOpened: null,
};

export const recipeSlice = createSlice({
  name: "createRecipe",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRecipeState: (state, action: PayloadAction<Food>) => {
      state.recipeState = action.payload;
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

export const { setRecipeState, setIngredientOpened } = recipeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCreateRecipeSlice = (state: RootState) => state.createRecipe;

export default recipeSlice.reducer;
