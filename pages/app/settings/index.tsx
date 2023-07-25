import {
  SetAvatar,
  SetCurrentSubscription,
  SetEmail,
  SetName,
  SettingsNav,
} from "@/features/settings";
import BackNav from "@/components/Layout/BackNav";
import SettingsLayout from "@/layouts/SettingsLayout";
import { useWindowWidth } from "@/hooks";

export default function Page() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  return (
    <SettingsLayout>
      <BackNav title="Profile" href="/app/profile" customClass="lg:hidden" />
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
    </SettingsLayout>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
