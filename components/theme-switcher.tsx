import { FC } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { Theme } from "@/types/types";
import { useDispatch } from "react-redux";
import { setTheme } from "@/store/slices/layoutSlice";

interface Props {
  theme: Theme;
}

const ThemeSwitcher: FC<Props> = ({ theme }) => {
  const dispatch = useDispatch();

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
    <button onClick={toogleTheme} className="transition-all ">
      {theme == Theme.dark ? (
        <SunIcon className="h-4 w-4 text-yellow-500" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
