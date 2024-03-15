import BackNav from "@/components/Layout/BackNav";
import { ProfileNav } from "@/features/profile";
import { useWindowWidth } from "@/hooks";
import PremiumLayout from "@/layouts/PremiumLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PremiumSidebar } from "./components";
import PremiumNav from "./components/Nav/PremiumNav";

interface Props {
  children: React.ReactNode;
}

function ProfileLayout({ children }: Props) {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <PremiumLayout>
      {!isMobile && <PremiumNav hideScrolling={false} title="" />}
      <PremiumSidebar />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 px-2 pb-2 pt-2 sm:px-5 lg:pt-0">
        {router.asPath !== "/app/profile" && (
          <BackNav
            title="Profile"
            href="/app/profile"
            customClass="lg:hidden !top-0"
          />
        )}
        <div className="flex w-full items-start gap-5 lg:pt-0">
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

export default dynamic(() => Promise.resolve(ProfileLayout), { ssr: false });
