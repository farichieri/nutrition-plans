import FavoritePlans from "@/features/favorites/components/favorite-plans";
import FavoritesLayout from "@/layouts/FavoritesLayout";

export default function Page() {
  return (
    <FavoritesLayout>
      <FavoritePlans />
    </FavoritesLayout>
  );
}
