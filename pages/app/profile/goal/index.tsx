import { Goal } from "@/features/authentication";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  const handleContinue = () => {};

  return (
    <ProfileLayout>
      <Goal handleContinue={handleContinue} />
    </ProfileLayout>
  );
}
