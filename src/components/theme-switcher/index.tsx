import { Theme } from "@/types";
import { useTheme } from "next-themes";
import { FC } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

interface Props {
  withText: boolean;
}

const ThemeSwitcher: FC<Props> = ({ withText }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === Theme.Dark || theme === Theme.System) {
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#fff");
      setTheme(Theme.Light);
    } else {
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#000");
      setTheme(Theme.Dark);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex w-full items-center justify-between gap-1 transition-all"
      aria-label="Toggle theme"
    >
      {withText && <span>Theme</span>}
      {theme === Theme.Dark || theme === Theme.System ? (
        <div className="flex items-center gap-2">
          {withText && <span>Dark</span>}
          <MdDarkMode className="h-5 w-5 text-yellow-500" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {withText && <span>Light</span>}
          <MdLightMode className="h-5 w-5 text-yellow-500" />
        </div>
      )}
    </button>
  );
};

export default ThemeSwitcher;
