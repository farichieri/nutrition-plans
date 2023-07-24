import {
  SetAvatar,
  SetCurrentSubscription,
  SetEmail,
  SetName,
} from "@/features/settings";
import SettingsLayout from "@/layouts/SettingsLayout";

export default function Page() {
  return (
    <SettingsLayout>
      <div className="flex w-full flex-col gap-10">
        <SetAvatar />
        <SetName />
        <SetEmail />
        <SetCurrentSubscription />
      </div>
    </SettingsLayout>
  );
}
