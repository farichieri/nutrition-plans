import { BaseDates } from "@/types/dates";
import { isValidDate } from "@/utils/dateFormat";
import { isValidStringFormat } from "@/features/plans";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
