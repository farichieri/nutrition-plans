import { AppRoutes } from "@/utils";
import { auth } from "@/services/firebase/firebase.config";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { persistor } from "@/store/store";
import { PrimaryButton } from "@/components/Buttons";
import { selectAuthSlice } from "@/features/authentication/slice";
import { setProgress } from "@/features/progress";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Avatar from "@/components/Avatar/Avatar";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Link from "next/link";
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
    { name: "Pricing", url: "/pricing" },
    { name: "About", url: "/about" },
    { name: "Blog", url: "/blog" },
  ];

  const MOBILE_PAGES = [
    { name: "Blog", url: "/blog", onClick: handleMenu },
    { name: "Plans", url: "/plans", onClick: handleMenu },
    { name: "Pricing", url: "/pricing", onClick: handleMenu },
    { name: "About", url: "/about", onClick: handleMenu },
  ];

  return (
    <nav className="fixed top-0 z-50 flex w-full select-none items-center justify-center bg-white/50 px-4 backdrop-blur-md dark:bg-black/50 ">
      <div className="z-50 flex h-[var(--nav-h)] w-full max-w-5xl items-center justify-between gap-4 border-b border-gray-500/20 px-2 dark:border-cyan-100/20">
        <div className="flex w-fit min-w-fit basis-1/3 justify-start font-bold xxs:text-sm xs:text-base sm:text-2xl">
          <Link href={"/"}>Nutrition Plans</Link>
        </div>
        <div className="hidden basis-1/3 items-center justify-center gap-4 text-xs font-medium sm:text-base lg:flex lg:gap-10">
          {!isLogin &&
            !isSignup &&
            PAGES.map((page) => (
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
            <div className="hidden lg:flex">
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
            <div className="cursor-pointer lg:hidden">
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
          } absolute top-[var(--nav-h)] flex h-screen w-full flex-col items-center bg-white px-4 shadow-sm transition-all duration-300 dark:bg-black dark:shadow-cyan-100/20 lg:hidden `}
        >
          <div className="flex w-full flex-col items-center justify-center gap-10 border-b text-base font-semibold">
            {user && (
              <div className="w-full divide-y border-b">
                <div className="flex w-full items-center justify-between py-3 duration-300 hover:bg-slate-500/10 hover:opacity-100">
                  <div className="flex flex-col gap-0 text-base font-normal leading-5 opacity-70 ">
                    <span>{user.display_name}</span>
                    <span>{user.email_address}</span>
                  </div>
                  <Avatar width={30} height={30} changeable={false} />
                </div>

                <div className="w-full divide-y ">
                  <Link href="/app/today">
                    <div className="flex w-full items-center justify-between py-3 duration-300 hover:bg-slate-500/10 hover:opacity-100">
                      <span>App</span>
                      <span className="material-icons-outlined text-green-500">
                        favorite
                      </span>
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
                    <span className="material-icons-outlined">login</span>
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
            href="mailto:webmaster@example.com"
          >
            <span>Contact: </span>
            <span>hello@nutritionplans.co</span>
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
