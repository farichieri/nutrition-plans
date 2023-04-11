import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { FC, MouseEventHandler, useState } from "react";
import { Theme } from "@/types/types";
import Avatar from "../Avatar/Avatar";
import Link from "next/link";
import Logout from "../Auth/Logout";
import ThemeSwitcher from "../theme-switcher";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/store/slices/authSlice";
import SubscribeButton from "../Buttons/Subscribe";

interface Props {
  theme: Theme;
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumNav: FC<Props> = ({ theme, sidebarOpen, handleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector(selectAuthSlice);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="fixed top-0 z-[80] flex w-full select-none items-center justify-center">
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-4 border-b bg-white/80 px-4 backdrop-blur-sm dark:border-cyan-100/20 dark:bg-black/80 ">
        <div className="text-md flex w-fit min-w-fit basis-1/3 justify-start font-bold sm:text-2xl">
          {sidebarOpen ? (
            <ArrowLeftOnRectangleIcon
              className="h-4 w-4"
              onClick={handleSidebar}
            />
          ) : (
            <ArrowRightOnRectangleIcon
              className="h-4 w-4"
              onClick={handleSidebar}
            />
          )}
        </div>
        <SubscribeButton />
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 text-xs sm:gap-10 sm:text-xl">
          <ThemeSwitcher theme={theme} />
          <div className="hidden md:flex">
            <Logout />
          </div>
          <Avatar src={user?.photoURL} width={40} height={40} />
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
            <Link href={"/asd"} onClick={handleMenu}>
              asd
            </Link>
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
