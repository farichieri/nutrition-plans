import { FavoriteFoods } from "@/features/favorites";
import FavoritesLayout from "@/layouts/FavoritesLayout";

export default function Page() {
  return (
    <FavoritesLayout>
      <FavoriteFoods />
    </FavoritesLayout>
  );
}
