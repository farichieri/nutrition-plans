import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { RootState } from "@/lib/store";

import { ShoppingListFoods } from "../types";

// export const postCupboard = createAsyncThunk(
//   "shopping/postCupboard",
//   async ({ userID, cupboard }: { userID: string; cupboard: Cupboard }) => {
//     const docRef = doc(db, "users", userID, "cupboard", "uniqueCupboard");
//     await setDoc(docRef, cupboard);
//   }
// );

interface ShoppingState {
  shopping: {
    foods: ShoppingListFoods;
    selecteds: string[];
    isAddingFood: boolean;
    dateRange: string;
  };
  cupboard: {
    foods: ShoppingListFoods;
    selecteds: string[];
    isAddingFood: boolean;
  };
}

// Define the initial state using that type
const initialState: ShoppingState = {
  shopping: {
    foods: {},
    selecteds: [],
    isAddingFood: false,
    dateRange: "",
  },
  cupboard: {
    foods: {},
    selecteds: [],
    isAddingFood: false,
  },
};

export const shoppingSlice = createSlice({
  name: "shopping",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCupboardFoods(state, action: PayloadAction<ShoppingListFoods>) {
      state.cupboard.foods = action.payload;
      state.cupboard.selecteds = [];
    },
    setShoppingListFoods(state, action: PayloadAction<ShoppingListFoods>) {
      state.shopping.foods = action.payload;
      state.shopping.selecteds = [];
    },
    setCupboardSelecteds(state, action: PayloadAction<string[]>) {
      state.cupboard.selecteds = action.payload;
    },
    setShoppingSelecteds(state, action: PayloadAction<string[]>) {
      state.shopping.selecteds = action.payload;
    },
    setIsAddingFoodToCupboard(state, action: PayloadAction<boolean>) {
      state.cupboard.isAddingFood = action.payload;
    },
    setIsAddingFoodToShopping(state, action: PayloadAction<boolean>) {
      state.cupboard.isAddingFood = action.payload;
    },
    setShoppingDateRange(state, action: PayloadAction<string>) {
      state.shopping.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
    // builder.addCase(postCupboard.fulfilled, (state, action) => {
    //   console.log("action", action);
    // });
  },
});

export const {
  setCupboardFoods,
  setCupboardSelecteds,
  setShoppingListFoods,
  setShoppingSelecteds,
  setIsAddingFoodToCupboard,
  setIsAddingFoodToShopping,
  setShoppingDateRange,
} = shoppingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShoppingSlice = (state: RootState) => state.shopping;

export default shoppingSlice.reducer;
