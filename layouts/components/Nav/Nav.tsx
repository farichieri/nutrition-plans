import { AppRoutes } from "@/utils";
import { auth } from "@/services/firebase/firebase.config";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { MdArrowForwardIos, MdFavorite } from "react-icons/md";
import { persistor } from "@/store";
import { PrimaryButton } from "@/components/Buttons";
import { selectAuthSlice } from "@/features/authentication/slice";
import { setProgress } from "@/features/progress";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Avatar from "@/components/Avatar/Avatar";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import ThemeSwitcher from "@/components/theme-switcher";

interface Props {}

const NavBar: FC<Props> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [openMenu, setOpenMenu] = useState(false);
  const isLogin = router.asPath === AppRoutes.login;
  const isSignup = router.asPath === AppRoutes.signup;

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    await signOut(auth)
      .then(() => {
        // ?
        dispatch(setProgress({}));
        persistor.purge();
      })
      .catch((error) => {
        console.error(error);
      });
    handleMenu();
  };

  const PAGES = [
    { name: "Plans", url: "/plans" },
    { name: "Blog", url: "/blog" },
    { name: "About", url: "/about" },
    { name: "Pricing", url: "/pricing" },
  ];

  const MOBILE_PAGES = [
    { name: "Plans", url: "/plans", onClick: handleMenu },
    { name: "Blog", url: "/blog", onClick: handleMenu },
    { name: "About", url: "/about", onClick: handleMenu },
    { name: "Pricing", url: "/pricing", onClick: handleMenu },
  ];

  return (
    <nav className="dark: fixed top-0 z-50 flex w-full select-none items-center justify-center bg-white/80 px-4 backdrop-blur-md dark:bg-[#111010cf] ">
      <div className="z-50 flex h-[var(--nav-h)] w-full max-w-7xl  items-center justify-between gap-4 border-b border-gray-500/20 px-2 dark:border-gray-400/10">
        <div className="flex w-fit min-w-fit basis-1/3 justify-start font-bold xxs:text-sm xs:text-base sm:text-2xl">
          <Link href={"/"}>
            <Logo hideText={false} />
          </Link>
        </div>
        <div className="hidden basis-1/3 items-center justify-center gap-4 text-xs font-medium sm:text-base md:flex md:gap-10">
          {!isLogin &&
            !isSignup &&
            PAGES.map((page) => (
              <Link
                href={page.url}
                key={page.name}
                className={`rounded-3xl px-3 py-1 text-sm duration-300 hover:opacity-100 ${
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
          {user && (
            <Link
              href={AppRoutes.today}
              className="flex items-center justify-center gap-1 rounded-3xl border border-green-500 bg-green-500/70 px-3 py-1.5 text-sm font-semibold duration-300 hover:bg-green-500 active:bg-green-600"
            >
              <span className="text-white">Planner</span>
              <MdArrowForwardIos className="h-4 w-4 text-white" />
            </Link>
          )}

          {user ? (
            <div className="hidden md:flex">
              <AvatarDropDown isApp={false} />
            </div>
          ) : (
            <>
              {!isSignup && (
                <>
                  {!isLogin && (
                    <Link href={"/login"} className="">
                      <button className="font-semibold xs:text-sm sm:text-base">
                        Log in
                      </button>
                    </Link>
                  )}
                  <div className="flex h-7 items-center text-xs xs:text-sm">
                    <Link href="/signup">
                      <PrimaryButton onClick={() => {}} content="Sign up" />
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
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
        <div
          className={`${
            openMenu ? "left-0" : "left-full"
          } absolute top-[var(--nav-h)] flex h-screen w-full flex-col items-center bg-primary-color px-4 shadow-sm transition-all duration-300 dark:shadow-cyan-100/20 md:hidden `}
        >
          <div className="flex w-full flex-col items-center justify-center gap-10 border-b text-base font-semibold">
            {user && (
              <div className="w-full divide-y border-b">
                <div className="flex w-full items-center justify-between py-3 duration-300 hover:bg-slate-500/10 hover:opacity-100">
                  <div className="flex flex-col gap-0 text-base font-normal leading-5 opacity-70 ">
                    <span>{user.displayName}</span>
                    <span>{user.emailAddress}</span>
                  </div>
                  <Avatar width={30} height={30} />
                </div>

                <div className="w-full divide-y ">
                  <Link href={AppRoutes.today}>
                    <div className="flex w-full items-center justify-between py-3 duration-300 hover:bg-slate-500/10 hover:opacity-100">
                      <span>Planner</span>
                      <MdArrowForwardIos className="h-4 w-4 text-green-500" />
                    </div>
                  </Link>

                  <div className="flex w-full items-center justify-center gap-2 py-3 duration-300 hover:bg-slate-500/10 hover:opacity-100">
                    <ThemeSwitcher withText={true} />
                  </div>

                  <div
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center justify-between py-3 duration-300 hover:bg-slate-500/10 hover:opacity-100"
                  >
                    <span>Log Out</span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex w-full flex-col divide-y ">
              {MOBILE_PAGES.map((page) => (
                <Link
                  href={page.url}
                  onClick={page.onClick}
                  key={page.name}
                  className="w-full py-3 duration-300 hover:bg-slate-500/10 hover:opacity-100"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>

          <a
            className="flex w-full justify-between border-b py-3 font-semibold duration-300 hover:bg-slate-500/10 hover:opacity-100"
            href="mailto:hello@nutritionplans.co"
          >
            <span>Contact</span>
          </a>
          {!user && (
            <div className="flex w-full items-center justify-center gap-2 border-b py-3 font-semibold duration-300 hover:bg-slate-500/10 hover:opacity-100">
              <ThemeSwitcher withText={true} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
