import { FC, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { Theme } from "@/types/types";

interface Props {
  theme: Theme;
}

const ThemeSwitcher: FC<Props> = ({ theme }) => {
  const [_theme, setTheme] = useState<Theme>(theme);

  const toogleTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme(Theme.light);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme(Theme.dark);
    }
  };

  return (
    <button onClick={toogleTheme} className="transition-all ">
      {_theme == Theme.dark ? (
        <SunIcon className="h-4 w-4 text-yellow-500" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
