import { SettingsNav } from "@/features/settings";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";

interface Props {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: Props) {
  return (
    <PremiumLayout>
      <section className="m-auto flex h-full w-full max-w-screen-xl flex-col justify-center pb-24 ">
        <PremiumNav hideScrolling={false} />
        <div className="flex w-full justify-center border-b py-8 text-2xl font-semibold sm:mb-5">
          Personal Settings Account
        </div>
        <div className="flex flex-col gap-5 sm:flex-row">
          <SettingsNav />
          <div className="h-full w-full px-4">{children}</div>
        </div>
      </section>
    </PremiumLayout>
  );
}
