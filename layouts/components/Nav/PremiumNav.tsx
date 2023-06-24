import { AppRoutes } from "@/utils";
import { FC, useEffect, useState } from "react";
import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { useSelector } from "react-redux";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Feedback from "@/features/client-contact/components/Feedback/Feedback";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import ToggleSidebar from "@/layouts/components/Sidebar/ToggleSidebar";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {}

const PremiumNav: FC<Props> = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const { sidebarOpen } = useSelector(selectLayoutSlice);
  const windowWidth = useWindowWidth();

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`active ${
        !show && "hidden"
      } fixed top-0 z-[70] flex w-screen select-none items-center justify-center`}
    >
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-2 border-b bg-white/100 pr-4 backdrop-blur-sm dark:border-slate-400/20 dark:bg-black/100 dark:shadow-cyan-100/10 xs:gap-4 ">
        <div className="text-md flex w-fit min-w-fit basis-1/3 cursor-pointer items-center justify-start font-semibold sm:text-2xl md:ml-24">
          <div className="px-2 md:hidden">
            <ToggleSidebar />
          </div>
          {!sidebarOpen && (
            <Link href={AppRoutes.today}>
              <Logo hideText={windowWidth < 640} />
            </Link>
          )}
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
