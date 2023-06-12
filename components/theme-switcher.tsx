import { FC } from "react";
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
          <span className="material-icons-sharp md-18 text-yellow-500">
            dark_mode
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {withText && <span>Light</span>}
          <span className="material-icons-sharp md-18 text-yellow-500">
            light_mode
          </span>
        </div>
      )}
    </button>
  );
};

export default ThemeSwitcher;
