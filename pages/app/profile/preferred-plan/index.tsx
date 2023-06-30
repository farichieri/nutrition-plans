import { PlanSelector } from "@/features/authentication";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  const handleContinue = () => {};
  return (
    <ProfileLayout>
      <PlanSelector handleContinue={handleContinue} />
    </ProfileLayout>
  );
}
