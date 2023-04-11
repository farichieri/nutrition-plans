import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { FC, MouseEventHandler, useState } from "react";
import AvatarDropDown from "../DropDown/AvatarDropDown/AvatarDropDown";

interface Props {
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumNav: FC<Props> = ({ sidebarOpen, handleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="fixed top-0 z-[80] flex w-full select-none items-center justify-center">
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-4 border-b bg-white/80 px-4 backdrop-blur-sm dark:border-cyan-100/20 dark:bg-black/80 ">
        <div className="text-md flex w-fit min-w-fit basis-1/3 items-center justify-start gap-4 font-semibold sm:text-2xl">
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
          <span className="flex">Nutrition Plans</span>
        </div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 text-xs sm:gap-10 sm:text-xl">
          <AvatarDropDown />
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
