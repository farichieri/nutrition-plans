import { BeforeInstallPromptEvent } from "@/types";
import { useEffect, useState } from "react";

const useBeforeInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent>();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      setDeferredPrompt(event);
    });
    return () => {
      window.addEventListener("beforeinstallprompt", (event) => {
        setDeferredPrompt(event);
      });
    };
  }, []);
  return deferredPrompt;
};

export default useBeforeInstallPrompt;
