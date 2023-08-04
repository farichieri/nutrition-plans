import { FavoriteMeals, FavoritesTypeSelector } from "@/features/favorites";
import { PremiumSidebar } from "@/layouts/components";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import InfoMessage from "@/components/Layout/InfoMessage";

interface Props {
  children: React.ReactNode;
}

export default function LibraryMealsLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <FavoritesTypeSelector />
        <InfoMessage message="Having days saved will help you plan your meals faster by overriding it in your planner instead of planning it manually." />
        <FavoriteMeals />
        {children}
      </section>
    </PremiumLayout>
  );
}
