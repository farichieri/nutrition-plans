import { PremiumSidebar } from "./components";
import { ProfileNav } from "@/features/profile";
import { useRouter } from "next/router";
import BackNav from "@/components/Layout/BackNav";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Props) {
  const router = useRouter();

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <PremiumSidebar />
      <section className="mx-auto flex w-full max-w-7xl items-start justify-center gap-5 px-2 pb-2 sm:px-5">
        <div className="hidden w-full min-w-fit max-w-xxs lg:flex">
          {<ProfileNav />}
        </div>
        {router.asPath !== "/app/profile" && (
          <BackNav
            title="Profile"
            href="/app/profile"
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
