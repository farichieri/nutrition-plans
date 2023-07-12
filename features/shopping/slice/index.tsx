import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { RootState } from "@/store";
import { ShoppingListFoods } from "../types";

// export const postCupboard = createAsyncThunk(
//   "shopping/postCupboard",
//   async ({ userID, cupboard }: { userID: string; cupboard: Cupboard }) => {
//     const docRef = doc(db, "users", userID, "cupboard", "uniqueCupboard");
//     await setDoc(docRef, cupboard);
//   }
// );

interface ShoppingState {
  shoppingList: {
    foods: ShoppingListFoods;
    selecteds: string[];
  };
  cupboard: {
    foods: ShoppingListFoods;
    selecteds: string[];
  };
}

// Define the initial state using that type
const initialState: ShoppingState = {
  shoppingList: {
    foods: {},
    selecteds: [],
  },
  cupboard: {
    foods: {},
    selecteds: [],
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
      state.shoppingList.foods = action.payload;
      state.shoppingList.selecteds = [];
    },
    setCupboardSelecteds(state, action: PayloadAction<string[]>) {
      state.cupboard.selecteds = action.payload;
    },
    setShoppingSelecteds(state, action: PayloadAction<string[]>) {
      state.shoppingList.selecteds = action.payload;
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
} = shoppingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShoppingSlice = (state: RootState) => state.shopping;

export default shoppingSlice.reducer;
