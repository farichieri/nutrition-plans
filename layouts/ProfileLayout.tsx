import { PremiumSidebar } from "./components";
import { ProfileNav } from "@/features/profile";
import { useRouter } from "next/router";
import BackNav from "@/components/Layout/BackNav";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
import { useWindowWidth } from "@/hooks";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <PremiumSidebar />
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-5 px-2 pb-2 pt-2 sm:px-5">
        {(router.asPath !== "/app/profile" || !isMobile) && (
          <div className="w-full min-w-fit max-w-xxs lg:flex">
            <ProfileNav />
          </div>
        )}
        <div className="flex w-full max-w-4xl flex-col items-center gap-10 lg:pt-0">
          {children}
        </div>
      </section>
    </PremiumLayout>
  );
}
