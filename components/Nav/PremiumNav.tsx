import { Bars3Icon } from "@heroicons/react/20/solid";
import { FC, MouseEventHandler, useState } from "react";
import AvatarDropDown from "../DropDown/AvatarDropDown/AvatarDropDown";
import SubscribeButton from "../Buttons/Subscribe";

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
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-4 bg-white/100 px-4 shadow-md backdrop-blur-sm dark:border-cyan-100/20 dark:bg-black/100 dark:shadow-cyan-100/10 ">
        <div className="text-md flex w-fit min-w-fit basis-1/3 items-center justify-start gap-4 font-semibold sm:text-2xl">
          <Bars3Icon
            className="h-4 w-4 cursor-pointer"
            onClick={handleSidebar}
          />
          <span className="flex">Nutrition Plans</span>
        </div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-4 pr-2 text-xs sm:gap-10 sm:text-xl">
          <div>
            <SubscribeButton />
          </div>
          <AvatarDropDown />
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
