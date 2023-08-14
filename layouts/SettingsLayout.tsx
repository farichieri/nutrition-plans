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
      <PremiumNav hideScrolling={false} title="Settings" />
      <PremiumSidebar />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 px-2 pb-2 pt-2 sm:px-5">
        {router.asPath !== "/app/settings" && (
          <BackNav
            title="Settings"
            href="/app/settings"
            customClass="lg:hidden"
          />
        )}
        <div className="flex w-full items-start gap-5 pt-[var(--nav-h)] lg:pt-0">
          <div className="sticky top-[var(--nav-h)] hidden w-full min-w-fit max-w-xxs lg:flex">
            <SettingsNav />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </section>
    </PremiumLayout>
  );
}
