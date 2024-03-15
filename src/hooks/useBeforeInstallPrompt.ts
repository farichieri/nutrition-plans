"use client";

import { useEffect, useState } from "react";

import { BeforeInstallPromptEvent } from "@/types";

const useBeforeInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent>();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });
    return () => {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        setDeferredPrompt(event);
      });
    };
  }, []);
  return deferredPrompt;
};

export default useBeforeInstallPrompt;
