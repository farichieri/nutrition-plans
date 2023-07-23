import { Favorites } from "@/features/favorites";
import FavoritesTypeSelector from "@/features/favorites/components/FavoritesTypeSelector";
import ProfileLayout from "@/layouts/ProfileLayout";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  return (
    <ProfileLayout>
      <section className="m-auto flex w-full flex-col justify-center gap-2 px-2 pb-2 pt-[var(--nav-h)] sm:px-5">
        <FavoritesTypeSelector />
        <Favorites />
      </section>
    </ProfileLayout>
  );
}
