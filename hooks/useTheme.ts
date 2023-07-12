import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { Theme } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useTheme = () => {
  const { theme } = useSelector(selectLayoutSlice);
  const [_theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#111010");
      setTheme(Theme.Dark);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#fff");
      setTheme(Theme.Light);
    }
  }, [theme]);

  return _theme;
};

export default useTheme;
