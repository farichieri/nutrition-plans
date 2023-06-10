import { Bars3Icon } from "@heroicons/react/24/solid";
import { FC, MouseEventHandler } from "react";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Feedback from "@/features/client-contact/components/Feedback/Feedback";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumNav: FC<Props> = ({ sidebarOpen, handleSidebar }) => {
  return (
    <nav className="fixed top-0 z-[80] flex w-screen select-none items-center justify-center">
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-2 border-b bg-white/100 pr-4 backdrop-blur-sm dark:border-slate-400/20 dark:bg-black/100 dark:shadow-cyan-100/10 xs:gap-4 ">
        <div className="text-md flex w-fit min-w-fit basis-1/3 cursor-pointer items-center justify-start font-semibold sm:text-2xl">
          <div className="flex w-12 items-center justify-center xs:w-14 sm:w-20 ">
            <RoundButton customClass="h-10 w-10" onClick={handleSidebar}>
              {!sidebarOpen ? (
                <Bars3Icon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </RoundButton>
          </div>
          <span onClick={handleSidebar} className="flex">
            Nutrition Plans co
          </span>
        </div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-2 pr-2 text-xs xs:gap-4 sm:gap-10 sm:pr-5 sm:text-xl xl:pr-10">
          <Feedback />
          <AvatarDropDown isApp={true} />
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
