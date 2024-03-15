import { PremiumNav } from "@/components";
import InfoMessage from "@/components/Layout/InfoMessage";
import { PremiumSidebar } from "@/components/Sidebar";
import { LibraryMeals, LibraryTypeSelector } from "@/features/library";

import PremiumLayout from "../PremiumLayout";

interface Props {
  children: React.ReactNode;
}

export default function LibraryMealsLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="" />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <LibraryTypeSelector />
        <InfoMessage message="Having days saved will help you plan your meals faster by overriding it in your planner instead of planning it manually." />
        <LibraryMeals />
        {children}
      </section>
    </PremiumLayout>
  );
}
