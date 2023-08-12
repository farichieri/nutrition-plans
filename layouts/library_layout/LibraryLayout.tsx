import { LibraryTypeSelector } from "@/features/library";
import { PremiumSidebar } from "../components";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "../components/Nav/PremiumNav";

interface Props {
  children: React.ReactNode;
}

export default function LibraryLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="Library" />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <LibraryTypeSelector />
        {children}
      </section>
    </PremiumLayout>
  );
}
