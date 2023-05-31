import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import Link from "next/link";
import PrimaryButton from "../Buttons/PrimaryButton";
import ThemeSwitcher from "../theme-switcher";

interface Props {}

const NavBar: FC<Props> = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector(selectAuthSlice);

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
    <nav className="fixed top-0 z-50 flex w-full select-none items-center justify-center bg-white/50 px-4 backdrop-blur-md dark:bg-black/50 ">
      <div className="z-50 flex h-[var(--nav-h)] w-full max-w-5xl items-center justify-between gap-4 border-b border-gray-500/20 px-2 dark:border-cyan-100/20">
        <div className="flex w-fit min-w-fit basis-1/3 justify-start font-bold xxs:text-sm xs:text-base sm:text-2xl">
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
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 text-xs xs:gap-5 sm:gap-10 sm:text-xl">
          {user ? (
            <Link href={"/app"}>
              <Avatar changeable={false} width={30} height={30} />
            </Link>
          ) : (
            // <AvatarDropDown isApp={false} />
            <>
              <Link href={"/login"} className="">
                <button className="font-semibold xs:text-sm sm:text-base">
                  Log in
                </button>
              </Link>
              <div className="flex h-7 items-center text-xs xs:text-sm">
                <Link href="/signup">
                  <PrimaryButton onClick={() => {}} content="Sign up" />
                </Link>
              </div>
            </>
          )}
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
          } absolute top-[var(--nav-h)] h-screen w-screen  bg-white px-4 shadow-sm transition-all duration-300 dark:bg-black dark:shadow-cyan-100/20 lg:hidden`}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-lg font-semibold">
            <Link
              href={"/plans"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 border-gray-500/40 py-2"
            >
              Plans
            </Link>
            <Link
              href={"/pricing"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 border-gray-500/40 pb-2"
            >
              Pricing
            </Link>
            <Link
              href={"/about"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 border-gray-500/40 pb-2"
            >
              About
            </Link>
            <Link
              href={"/blog"}
              onClick={handleMenu}
              className="w-full border-b border-gray-300 border-gray-500/40 pb-2"
            >
              Blog
            </Link>
            <div className="flex w-full items-center justify-center gap-2 border-b border-gray-300 border-gray-500/40 pb-2">
              <ThemeSwitcher withText={true} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
