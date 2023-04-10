import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { FC, useState } from "react";
import { Theme } from "@/types/types";
import Link from "next/link";
import PrimaryButton from "../Buttons/Primary";
import ThemeSwitcher from "../theme-switcher";

interface Props {
  theme: Theme;
}

const NavBar: FC<Props> = ({ theme }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="fixed top-0 flex w-full select-none items-center justify-center">
      <div className="flex h-[var(--nav-h)] w-full max-w-5xl items-center justify-between gap-4 border-b bg-white/80 px-4 backdrop-blur-sm dark:border-cyan-100/20 dark:bg-black/80 ">
        <div className="flex w-fit min-w-fit basis-1/3 justify-start text-sm font-bold sm:text-2xl">
          <Link href={"/"}>Nutrition Plans</Link>
        </div>
        <div className="hidden basis-1/3 items-center justify-center gap-4 text-xs font-normal sm:text-lg md:flex lg:gap-10">
          <Link href={"/pricing"}>Pricing</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/blog"}>Blog</Link>
        </div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 text-xs sm:gap-10 sm:text-xl">
          <ThemeSwitcher theme={theme} />
          <Link href={"/login"} className="hidden sm:flex">
            <button className="font-medium">Log in</button>
          </Link>
          <div className="flex h-7 items-center text-xs">
            <PrimaryButton href="/signup" content="Sign up" />
          </div>
          <div className="cursor-pointer md:hidden">
            {!openMenu ? (
              <Bars3Icon className="h-5 w-5" onClick={handleMenu} />
            ) : (
              <XMarkIcon className="h-5 w-5" onClick={handleMenu} />
            )}
          </div>
        </div>
        <div
          className={`${
            openMenu ? "left-0" : "left-full"
          } absolute top-[var(--nav-h)] w-screen border-t bg-white/90 px-4 py-4 shadow-md transition-all duration-300 dark:border-t-cyan-100/20 dark:bg-black/80 dark:shadow-cyan-100/20 md:hidden`}
        >
          <div className="flex flex-col items-center justify-center gap-4 text-lg font-semibold">
            <Link href={"/login"} onClick={handleMenu}>
              <button className="font-medium">Log in</button>
            </Link>
            <Link href={"/pricing"} onClick={handleMenu}>
              Pricing
            </Link>
            <Link href={"/about"} onClick={handleMenu}>
              About
            </Link>
            <Link href={"/blog"} onClick={handleMenu}>
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
