import { FC } from "react";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
}

const PremiumSidebar: FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`${
        sidebarOpen ? "left-0" : "-left-full"
      } absolute left-0 z-50 h-screen w-[12rem] border-r transition-all duration-300 dark:border-cyan-100/20`}
    ></div>
  );
};

export default PremiumSidebar;
