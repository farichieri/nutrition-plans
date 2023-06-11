import { useEffect } from "react";
import { useRouter } from "next/router";
import { isValidDate } from "@/utils/dateFormat";
import { BaseDatesEnum } from "@/types/datesTypes";
import { isValidStringFormat } from "@/features/plans";

const useRedirectToday = (date: string) => {
  const router = useRouter();
  useEffect(() => {
    if (!isValidStringFormat(date) && !isValidDate(date)) {
      router.replace({
        pathname: router.pathname,
        query: {
          date: BaseDatesEnum.today,
        },
      });
    }
  }, []);
};

export default useRedirectToday;
