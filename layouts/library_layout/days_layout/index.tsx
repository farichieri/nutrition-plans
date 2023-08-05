import { FavoritesTypeSelector } from "@/features/favorites";
import { PremiumSidebar } from "@/layouts/components";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import FavoritePlans from "@/features/favorites/components/favorite_days";
import InfoMessage from "@/components/Layout/InfoMessage";

interface Props {
  children: React.ReactNode;
}

export default function LibraryDaysLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <FavoritesTypeSelector />
        <InfoMessage message="Having meals saved will help you plan your days faster by overriding it in your planner instead of planning it manually." />
        <FavoritePlans />
        {children}
      </section>
    </PremiumLayout>
  );
}
