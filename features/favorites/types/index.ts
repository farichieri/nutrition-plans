import { FoodKind } from "@/features/foods";

export interface Favorite {
  id: string;
  kind: FoodKind;
}

export interface FavoriteFoods {
  [id: string]: Favorite;
}
