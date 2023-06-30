import { ProfileNav } from "@/features/profile/components";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} />
      <ProfileNav />
    </PremiumLayout>
  );
}
