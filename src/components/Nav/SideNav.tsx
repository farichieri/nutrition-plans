"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { FC } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch } from "react-redux";

import Avatar from "@/components/Avatar/Avatar";
import ThemeSwitcher from "@/components/theme-switcher";
import { User } from "@/features/authentication";
import { setProgress } from "@/features/progress";
import { persistor } from "@/lib/store";
import { auth } from "@/services/firebase";
import { AppRoutes } from "@/utils";

interface Props {
  user: User | null;
  handleMenu: () => void;
  openMenu: boolean;
}

const SideNav: FC<Props> = ({ user, handleMenu, openMenu }) => {
  const dispatch = useDispatch();

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

  const MOBILE_PAGES = [
    { name: "Plans", url: "/plans", onClick: handleMenu },
    { name: "Blog", url: "/blog", onClick: handleMenu },
    { name: "About", url: "/about", onClick: handleMenu },
    { name: "Pricing", url: "/pricing", onClick: handleMenu },
  ];

  return (
    <div
      className={`${
        openMenu ? "left-0" : "left-full"
      } absolute top-[var(--nav-h)] flex h-screen w-full flex-col items-center bg-primary px-4 shadow-sm transition-all duration-300 dark:shadow-cyan-100/20 md:hidden `}
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
        )}{" "}
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
  );
};

export default SideNav;
