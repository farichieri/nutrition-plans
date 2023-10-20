import BackNav from "@/components/Layout/BackNav";
import {
  SetAvatar,
  SetCurrentSubscription,
  SetEmail,
  SetName,
  SettingsNav,
} from "@/features/settings";
import { useWindowWidth } from "@/hooks";
import SettingsLayout from "@/layouts/SettingsLayout";
import dynamic from "next/dynamic";

const InstallButton = dynamic(
  () => import("@/components/InstallApp/InstallButton")
);

function Page() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <SettingsLayout>
      <BackNav
        title="Profile"
        href="/app/profile"
        customClass="lg:hidden !top-0"
      />
      {isMobile ? (
        <div className="m-auto w-full max-w-xl lg:hidden">
          <div className="flex flex-col">
            <span className="mx-auto py-2 text-3xl font-semibold">
              Settings
            </span>
          </div>
          <SettingsNav />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4 lg:gap-10">
          <SetAvatar />
          <SetName />
          <SetEmail />
          <SetCurrentSubscription />
        </div>
      )}
      <InstallButton />
    </SettingsLayout>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
