import { Favorites } from "@/features/favorites";
import { PremiumSidebar } from "@/layouts";
import FavoritesTypeSelector from "@/features/favorites/components/FavoritesTypeSelector";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <FavoritesTypeSelector />
        <Favorites />
      </section>
    </PremiumLayout>
  );
}
