import { useEffect } from "react";
import { useRouter } from "next/router";
import { isValidDate } from "@/utils/dateFormat";
import { BaseDates } from "@/types/dates";
import { isValidStringFormat } from "@/features/plans";

const useRedirectToday = (date: string) => {
  const router = useRouter();
  useEffect(() => {
    if (!isValidStringFormat(date) && !isValidDate(date)) {
      router.replace({
        pathname: router.pathname,
        query: {
          date: BaseDates.today,
        },
      });
    }
  }, []);
};

export default useRedirectToday;
