"use client";

import { useEffect, useState } from "react";

import { User } from "@/features/authentication";

import isUserPremium from "../utils/isUserPremium";

export default function usePremiumStatus(user: User | null) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPremium());
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}
