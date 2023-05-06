import { FC } from "react";
import { Theme } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { selectLayoutSlice, setTheme } from "@/store/slices/layoutSlice";

interface Props {
  isPremium: boolean;
}

const ThemeSwitcher: FC<Props> = ({ isPremium }) => {
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
      className="flex items-center gap-1 transition-all "
    >
      {theme == Theme.dark ? (
        <span className="material-icons-sharp md-18 text-yellow-500">
          light_mode
        </span>
      ) : (
        <span className="material-icons-sharp md-18">dark_mode</span>
      )}
      {isPremium && <span>Theme</span>}
    </button>
  );
};

export default ThemeSwitcher;
