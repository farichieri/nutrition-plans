import { persistor } from "@/store/store";
import { Result } from "@/types";

const isAppVersionCorrect = (): Result<boolean, boolean> => {
  // App vershion must always exists.
  const appVersion = String(process.env.NEXT_PUBLIC_APP_VERSION);
  const cachedAppVersion = localStorage.getItem("APP_VERSION");
  console.log({ appVersion, cachedAppVersion });
  if (appVersion === cachedAppVersion) return { result: "success", data: true };
  else {
    persistor.purge();
    localStorage.setItem("APP_VERSION", appVersion);
    return { result: "error", error: false };
  }
};

export { isAppVersionCorrect };
