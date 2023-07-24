import { Favorites } from "@/features/favorites";
import FavoritesTypeSelector from "@/features/favorites/components/FavoritesTypeSelector";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  return (
    <ProfileLayout>
      <div className="flex w-full flex-col gap-4">
        <FavoritesTypeSelector />
        <Favorites />
      </div>
    </ProfileLayout>
  );
}
