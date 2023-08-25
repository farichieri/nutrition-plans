import { ShoppingListFoods } from "../types";
import { db } from "@/services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Result } from "@/types";
import { User } from "@/features/authentication";

const postShoppingList = async ({
  shoppingListFoods,
  user,
}: {
  shoppingListFoods: ShoppingListFoods;
  user: User;
}): Promise<Result<ShoppingListFoods, unknown>> => {
  try {
    const docRef = doc(db, "users", user.id, "shopping", "shoppingList");
    await setDoc(docRef, shoppingListFoods);
    return { result: "success", data: shoppingListFoods };
  } catch (error) {
    return { result: "error", error };
  }
};

export { postShoppingList };
