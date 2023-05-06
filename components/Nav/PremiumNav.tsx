import { FC, MouseEventHandler, useState } from "react";
import AvatarDropDown from "../DropDown/AvatarDropDown/AvatarDropDown";
import SubscribeButton from "../Buttons/Subscribe";
import Feedback from "../Premium/Feedback";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumNav: FC<Props> = ({ sidebarOpen, handleSidebar }) => {
  return (
    <nav className="fixed top-0 z-[80] flex w-screen select-none items-center justify-center">
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-4 border-b bg-white/100 px-4 backdrop-blur-sm dark:border-slate-400/20 dark:bg-black/100 dark:shadow-cyan-100/10 ">
        <div className="text-md flex w-fit min-w-fit basis-1/3 items-center justify-start gap-4 font-semibold sm:text-2xl">
          {!sidebarOpen ? (
            <Bars2Icon className="h-6 w-6" onClick={handleSidebar} />
          ) : (
            <XMarkIcon className="h-6 w-6" onClick={handleSidebar} />
          )}
          <span onClick={handleSidebar} className="flex">
            Nutrition Plans
          </span>
        </div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 pr-2 text-xs sm:gap-10 sm:text-xl xl:pr-10">
          <Feedback />
          <AvatarDropDown />
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
