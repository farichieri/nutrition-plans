import FavoritePlans from "@/features/favorites/components/favorite_plans";
import FavoritesLayout from "@/layouts/FavoritesLayout";

export default function Page() {
  return (
    <FavoritesLayout>
      <FavoritePlans />
    </FavoritesLayout>
  );
}
