import { AppRoutes } from "@/utils";
import { FC, ReactNode, useEffect, useState } from "react";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Feedback from "@/features/client-contact/components/Feedback/Feedback";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import ToggleSidebar from "@/layouts/components/Sidebar/ToggleSidebar";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {
  children?: ReactNode;
  title?: string;
  hideScrolling: boolean;
}

const PremiumNav: FC<Props> = ({ children, title, hideScrolling }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
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
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`${
        !show && hideScrolling && "hidden"
      } fixed left-0 top-0 z-[65] flex w-full  select-none items-center justify-center`}
    >
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-2 bg-primary-color backdrop-blur-sm dark:border-slate-400/20 dark:shadow-cyan-100/10 xs:gap-4">
        <div className="text-md flex w-fit min-w-fit basis-1/3 cursor-pointer items-center justify-start font-semibold sm:text-2xl md:ml-20">
          <div className="px-2 md:hidden">
            <ToggleSidebar />
          </div>
          <Link href={AppRoutes.today}>
            <Logo hideText={windowWidth < 640} />
          </Link>
        </div>
        {title && (
          <span className="m-auto min-w-fit font-semibold capitalize sm:hidden">
            {title}
          </span>
        )}
        <div className="w-full ">{children}</div>
        <div className="flex w-fit min-w-fit basis-1/3 items-center justify-end gap-2 pr-4 text-xs xs:gap-4 sm:gap-10 sm:pr-5 sm:text-xl xl:pr-10">
          <Feedback />
          <AvatarDropDown isApp={true} />
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
