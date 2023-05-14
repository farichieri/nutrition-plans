import { Bars3Icon } from "@heroicons/react/24/solid";
import { FC, MouseEventHandler } from "react";
import AvatarDropDown from "../DropDown/AvatarDropDown/AvatarDropDown";
import Feedback from "../Premium/Feedback";

interface Props {
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumNav: FC<Props> = ({ sidebarOpen, handleSidebar }) => {
  return (
    <nav className="fixed top-0 z-[80] flex w-screen select-none items-center justify-center">
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-4 border-b bg-white/100 pr-4 backdrop-blur-sm dark:border-slate-400/20 dark:bg-black/100 dark:shadow-cyan-100/10 ">
        <div className="text-md flex w-fit min-w-fit basis-1/3 cursor-pointer items-center justify-start font-semibold sm:text-2xl">
          <div className="flex w-14 items-center justify-center sm:w-20 ">
            <div className="rounded-full border border-transparent p-1.5 active:bg-slate-500/30 sm:hover:bg-slate-500/20 sm:active:border-black/10 sm:dark:active:border-white/10">
              {!sidebarOpen ? (
                <Bars3Icon className="h-7 w-7" onClick={handleSidebar} />
              ) : (
                <Bars3Icon className="h-7 w-7" onClick={handleSidebar} />
              )}
            </div>
          </div>
          <span onClick={handleSidebar} className="flex">
            Nutrition Plans
          </span>
        </div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 pr-2 text-xs sm:gap-10 sm:pr-5 sm:text-xl xl:pr-10">
          <Feedback />
          <AvatarDropDown />
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
