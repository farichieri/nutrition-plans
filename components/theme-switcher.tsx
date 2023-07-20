import { FC } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { selectLayoutSlice, setTheme } from "@/features/layout/slice";
import { Theme } from "@/types";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  withText: boolean;
}

const ThemeSwitcher: FC<Props> = ({ withText }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectLayoutSlice);

  const toogleTheme = () => {
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#fff");
      dispatch(setTheme(Theme.Light));
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#111010");
      dispatch(setTheme(Theme.Dark));
    }
  };

  return (
    <button
      onClick={toogleTheme}
      className="flex w-full items-center justify-between gap-1 transition-all"
    >
      {withText && <span>Theme</span>}
      {theme === Theme.Dark ? (
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
