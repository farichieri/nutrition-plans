import { BaseDatesEnum } from "@/types/datesTypes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Spinner from "@/components/Loader/Spinner";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      router.push(`${id}/${BaseDatesEnum.today}`);
    }
  }, [router]);

  return (
    <PremiumLayout>
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner customClass="h-5 w-5 m-auto" />
      </div>
    </PremiumLayout>
  );
}
