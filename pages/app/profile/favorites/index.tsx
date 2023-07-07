import { Favorites } from "@/features/favorites";
import FavoritesTypeSelector from "@/features/favorites/components/FavoritesTypeSelector";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  return (
    <ProfileLayout>
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-5 px-2 pb-2 pt-4 sm:px-5 sm:pt-4">
        <FavoritesTypeSelector />
        <Favorites />
      </section>
    </ProfileLayout>
  );
}