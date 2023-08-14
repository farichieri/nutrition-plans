import { PremiumSidebar } from "./components";
import { ProfileNav } from "@/features/profile";
import { useRouter } from "next/router";
import { useWindowWidth } from "@/hooks";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import BackNav from "@/components/Layout/BackNav";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="Profile" />
      <PremiumSidebar />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 px-2 pb-2 pt-2 sm:px-5">
        {router.asPath !== "/app/profile" && (
          <BackNav
            title="Profile"
            href="/app/profile"
            customClass="lg:hidden"
          />
        )}
        <div className="flex w-full items-start gap-5 pt-[var(--nav-h)] lg:pt-0">
          {(router.asPath !== "/app/profile" || !isMobile) && (
            <div className="top-[var(--nav-h)] hidden w-full min-w-fit max-w-xxs lg:sticky lg:flex">
              <ProfileNav />
            </div>
          )}
          <div className="w-full">{children}</div>
        </div>
      </section>
    </PremiumLayout>
  );
}
