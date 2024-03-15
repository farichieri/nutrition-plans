import { PremiumNav } from "@/components";
import { PremiumSidebar } from "@/components/Sidebar";
import { LibraryTypeSelector } from "@/features/library";

import PremiumLayout from "../PremiumLayout";

interface Props {
  children: React.ReactNode;
}

export default function LibraryLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="" />
      <PremiumSidebar />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col justify-center gap-2 px-2 pb-2 pt-2 sm:px-5">
        <LibraryTypeSelector />
        {children}
      </section>
    </PremiumLayout>
  );
}
