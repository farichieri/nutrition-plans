import { FavoriteFoods } from "@/features/favorites";
import FavoritesLayout from "@/layouts/library_layout";

export default function Page() {
  return (
    <FavoritesLayout>
      <FavoriteFoods />
    </FavoritesLayout>
  );
}
