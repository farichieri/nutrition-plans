import {
  Newsletter,
  SetMeasurementUnits,
  SetStartOfWeek,
} from "@/features/settings/components/General";
import SettingsLayout from "@/layouts/SettingsLayout";

export default function Page() {
  return (
    <SettingsLayout>
      <div className="flex flex-col gap-10">
        <SetMeasurementUnits />
        <SetStartOfWeek />
        <Newsletter />
      </div>
    </SettingsLayout>
  );
}
