import { FC } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { selectLayoutSlice, setTheme } from "@/store/slices/layoutSlice";
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
      dispatch(setTheme(Theme.light));
    } else {
      document.documentElement.classList.add("dark");
      dispatch(setTheme(Theme.dark));
    }
  };

  return (
    <button
      onClick={toogleTheme}
      className="flex w-full items-center justify-between gap-1 transition-all"
    >
      {withText && <span>Theme</span>}
      {theme === Theme.dark ? (
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
