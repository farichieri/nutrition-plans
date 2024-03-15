import { PremiumNav } from "@/components";
import InfoMessage from "@/components/Layout/InfoMessage";
import { PremiumSidebar } from "@/components/Sidebar";
import { LibraryDiets, LibraryTypeSelector } from "@/features/library";
import PremiumLayout from "@/layouts/PremiumLayout";

interface Props {
  children: React.ReactNode;
}

export default function LibraryDietsLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="" />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <LibraryTypeSelector />
        <InfoMessage message="Having meals saved will help you plan your days faster by overriding it in your planner instead of planning it manually." />
        <LibraryDiets />
        {children}
      </section>
    </PremiumLayout>
  );
}
