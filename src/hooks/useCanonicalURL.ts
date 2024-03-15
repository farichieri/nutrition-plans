"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useCanonicalURL() {
  const router = useRouter();
  const pathname = usePathname();
  const [canonicalURL, setCanonicalURL] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanonicalURL(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (router.asPath !== router.pathname) {
      setCanonicalURL(`https://nutritionplans.co${router.asPath}`);
    }
  }, [router.asPath, pathname]);

  return canonicalURL;
}
