"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { Theme } from "types/types";
import Link from "next/link";
import PrimaryButton from "./Buttons/Primary";
import ThemeSwitcher from "./theme-switcher";

interface Props {
  theme: Theme;
}

const NavBar: FC<Props> = ({ theme }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="fixed top-0 flex h-[var(--nav-h)] w-full select-none items-center justify-between gap-4 bg-white/80 px-4 shadow-md backdrop-blur-sm dark:bg-black/80 dark:shadow-cyan-100/20  lg:px-10">
      <div className="text-md flex w-fit min-w-fit basis-1/3 justify-start font-bold sm:text-2xl">
        <Link href={"/"}>Nutrition Plans</Link>
      </div>
      <div className="lgw:gap-10 hidden basis-1/3 items-center justify-center gap-4 text-xs font-semibold sm:text-xl md:flex">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/blog"}>Blog</Link>
      </div>
      <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 text-xs sm:gap-10 sm:text-xl">
        <ThemeSwitcher theme={theme} />
        <Link href={"/user"} className="hidden sm:flex">
          <button className="font-semibold">Log in</button>
        </Link>
        <div className="flex items-center text-xs">
          <PrimaryButton href="/subscribe" content="Start" />
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
          <Link href={"/user"}>
            <button className="font-semibold">Log in</button>
          </Link>
          <Link href={"/"} onClick={handleMenu}>
            Home
          </Link>
          <Link href={"/about"} onClick={handleMenu}>
            About
          </Link>
          <Link href={"/blog"} onClick={handleMenu}>
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
