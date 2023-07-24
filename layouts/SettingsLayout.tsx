import { PremiumSidebar } from "./components";
import { SettingsNav } from "@/features/settings";
import { useRouter } from "next/router";
import BackNav from "@/components/Layout/BackNav";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";

interface Props {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: Props) {
  const router = useRouter();

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <PremiumSidebar />
      <section className="mx-auto flex w-full max-w-7xl items-start gap-5 px-2 pb-2 sm:px-5">
        <div className="hidden w-full min-w-fit max-w-xxs lg:flex">
          {<SettingsNav />}
        </div>
        {router.asPath !== "/app/settings" && (
          <BackNav
            title="Settings"
            href="/app/settings"
            customClass="lg:hidden"
          />
        )}
        <div className="flex w-full flex-col items-center gap-10 pt-[var(--nav-h)] lg:pt-0">
          {children}
        </div>
      </section>
    </PremiumLayout>
  );
}
