import { SettingsNav } from "@/features/settings";
import BackNav from "@/components/Layout/BackNav";
import SettingsLayout from "@/layouts/SettingsLayout";

export default function Page() {
  return (
    <SettingsLayout>
      <BackNav title="Profile" href="/app/profile" customClass="lg:hidden" />
      <div className="m-auto w-full max-w-xl lg:hidden">
        <div className="flex flex-col">
          <span className="mx-auto text-xl font-semibold">Settings</span>
        </div>
        <SettingsNav />
      </div>
    </SettingsLayout>
  );
}

export const getStaticProps = () => {
  return {
    props: {},
  };
};
