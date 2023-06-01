import { BaseDatesEnum } from "@/types/datesTypes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      router.push(`${id}/${BaseDatesEnum.today}`);
    }
  }, [router, id]);

  return <Loader />;
}
