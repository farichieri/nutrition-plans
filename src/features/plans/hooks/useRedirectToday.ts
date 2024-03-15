"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { format } from "url";

import { isValidStringFormat } from "@/features/plans";
import { BaseDates } from "@/types/dates";
import { isValidDate } from "@/utils/dateFormat";

const useRedirectToday = (date: string) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isValidStringFormat(date) && !isValidDate(date)) {
      const url = format({
        pathname: pathname,
        query: {
          date: BaseDates.today,
        },
      });
      router.replace(url, { scroll: false });
    }
  }, []);
};

export default useRedirectToday;
