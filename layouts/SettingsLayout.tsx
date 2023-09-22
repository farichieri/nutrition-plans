import { PremiumSidebar } from "./components";
import { SettingsNav } from "@/features/settings";
import { useRouter } from "next/router";
import { useWindowWidth } from "@/hooks";
import BackNav from "@/components/Layout/BackNav";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import dynamic from "next/dynamic";

interface Props {
  children: React.ReactNode;
}

function SettingsLayout({ children }: Props) {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <PremiumLayout>
      {!isMobile && <PremiumNav hideScrolling={false} title="" />}
      <PremiumSidebar />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 px-2 pb-2 pt-2 sm:px-5 lg:pt-0">
        {router.asPath !== "/app/settings" && (
          <BackNav
            title="Settings"
            href="/app/settings"
            customClass="lg:hidden !top-0"
          />
        )}
        <div className="flex w-full items-start gap-5 lg:pt-0">
          <div className="sticky top-[var(--nav-h)] hidden w-full min-w-fit max-w-xxs lg:flex">
            <SettingsNav />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </section>
    </PremiumLayout>
  );
}

export default dynamic(() => Promise.resolve(SettingsLayout), { ssr: false });
