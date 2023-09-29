import { AppRoutes } from "@/utils";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useEffect, useState } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";

const ThemeSwitcher = dynamic(() => import("@/components/theme-switcher"), {
  ssr: false,
});

const SignOrAvatar = dynamic(() => import("./SignOrAvatar"), { ssr: false });

const SideNav = dynamic(() => import("./SideNav"), { ssr: false });

const Logo = dynamic(() => import("@/components/Logo/Logo"), { ssr: false });

interface Props {}

const NavBar: FC<Props> = () => {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const [openMenu, setOpenMenu] = useState(false);
  const isLogin = router.asPath === AppRoutes.login;
  const isSignup = router.asPath === AppRoutes.signup;
  const [show, setShow] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY === 0) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastYPos(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastYPos]);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const PAGES = [
    { name: "Plans", url: "/plans" },
    { name: "Blog", url: "/blog" },
    { name: "About", url: "/about" },
    { name: "Pricing", url: "/pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full select-none items-center justify-center border-gray-500/20 bg-white/80 px-2 backdrop-blur-md dark:border-gray-400/10 dark:bg-black/50  ${
        show ? "border-b shadow-md" : "border-none"
      }`}
    >
      <div
        className={`z-50 flex h-[var(--nav-h)] w-full max-w-7xl items-center justify-between gap-4 border-gray-500/20 px-2 dark:border-gray-400/10`}
      >
        <div className="flex w-fit min-w-fit basis-1/3 justify-start font-bold xxs:text-sm xs:text-base sm:text-2xl">
          <Link href={"/"}>
            <Logo hideText={true} />
          </Link>
        </div>
        <div className="hidden basis-1/3 items-center justify-center gap-4 text-xs font-medium sm:text-base md:flex md:gap-10">
          {!isLogin &&
            !isSignup &&
            PAGES.map((page) => (
              <Link
                href={page.url}
                key={page.name}
                className={`rounded-3xl px-3 py-1 text-base duration-300 hover:opacity-100 ${
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
          <div className="hidden md:flex">
            <ThemeSwitcher withText={false} />
          </div>
          <SignOrAvatar user={user} isSignup={isSignup} isLogin={isLogin} />

          {!isSignup && (
            <div className="cursor-pointer md:hidden">
              <button
                className="flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenu();
                }}
              >
                {!openMenu ? (
                  <Bars2Icon className="h-6 w-6" />
                ) : (
                  <XMarkIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>
        <SideNav openMenu={openMenu} handleMenu={handleMenu} user={user} />
      </div>
    </nav>
  );
};

export default NavBar;
