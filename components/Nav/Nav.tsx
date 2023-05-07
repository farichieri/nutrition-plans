import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PrimaryButton from "../Buttons/PrimaryButton";
import ThemeSwitcher from "../theme-switcher";

interface Props {}

const NavBar: FC<Props> = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const PAGES = [
    { name: "Plans", url: "/plans" },
    { name: "Pricing", url: "/pricing" },
    { name: "About", url: "/about" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <nav className="fixed top-0 z-50 flex w-full select-none items-center justify-center">
      <div className="z-50 flex h-[var(--nav-h)] w-full max-w-5xl items-center justify-between gap-4 border-b border-gray-500/20 bg-white/50 px-4 backdrop-blur-md dark:border-cyan-100/20 dark:bg-black/50 ">
        <div className="flex w-fit min-w-fit basis-1/3 justify-start text-sm font-bold sm:text-2xl">
          <Link href={"/"}>Nutrition Plans</Link>
        </div>
        <div className="hidden basis-1/3 items-center justify-center gap-4 text-xs font-medium sm:text-base lg:flex lg:gap-10">
          {PAGES.map((page) => (
            <Link
              href={page.url}
              key={page.name}
              className={`rounded-3xl px-3 py-0.5 duration-300 hover:opacity-100 ${
                router.asPath === page.url
                  ? "bg-slate-400/20 opacity-100"
                  : "opacity-50"
              }`}
            >
              {page.name}
            </Link>
          ))}
        </div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 text-xs sm:gap-10 sm:text-xl">
          <div className="hidden text-xs lg:flex">
            <ThemeSwitcher withText={false} />
          </div>
          <Link href={"/login"} className="hidden lg:flex">
            <button className="text-base font-semibold">Log in</button>
          </Link>
          <div className="flex h-7 items-center text-xs">
            <Link href="/signup">
              <PrimaryButton onClick={() => {}} content="Sign up" />
            </Link>
          </div>
          <div className="cursor-pointer lg:hidden">
            {!openMenu ? (
              <Bars2Icon className="h-6 w-6" onClick={handleMenu} />
            ) : (
              <XMarkIcon className="h-6 w-6" onClick={handleMenu} />
            )}
          </div>
        </div>
        <div
          className={`${
            openMenu ? "left-0" : "left-full"
          } absolute top-[var(--nav-h)] h-screen w-screen border-t bg-white px-5 shadow-sm transition-all duration-300 dark:border-t-cyan-100/20 dark:bg-black dark:shadow-cyan-100/20 lg:hidden`}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-lg font-semibold">
            <Link
              href={"/login"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 py-2 dark:border-gray-500"
            >
              Log in
            </Link>
            <Link
              href={"/plans"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 pb-2 dark:border-gray-500"
            >
              Plans
            </Link>
            <Link
              href={"/pricing"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 pb-2 dark:border-gray-500"
            >
              Pricing
            </Link>
            <Link
              href={"/about"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 pb-2 dark:border-gray-500"
            >
              About
            </Link>
            <Link
              href={"/blog"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 pb-2 dark:border-gray-500"
            >
              Blog
            </Link>
            <div className="flex w-full items-center justify-center gap-2 border-b border-gray-300 pb-2 dark:border-gray-500">
              <ThemeSwitcher withText={true} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
