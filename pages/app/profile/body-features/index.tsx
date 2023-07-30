import BMRCalculator from "@/features/authentication/components/create-user/body-features/BodyFeatures";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  const handleContinue = () => {};
  return (
    <ProfileLayout>
      <BMRCalculator handleContinue={handleContinue} />
    </ProfileLayout>
  );
}
