import { persistor } from "@/store";
import { Result } from "@/types";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const isAppVersionCorrect = (): Result<boolean, boolean> => {
  // App version must always exists.
  const appVersion = publicRuntimeConfig.version;
  const cachedAppVersion = localStorage.getItem("APP_VERSION");
  if (appVersion === cachedAppVersion) return { result: "success", data: true };
  else {
    persistor.purge();
    localStorage.setItem("APP_VERSION", appVersion);
    return { result: "error", error: false };
  }
};

export { isAppVersionCorrect };
