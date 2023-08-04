import { AppRoutes } from "@/utils";
import { FC, ReactNode, useEffect, useState } from "react";
import { SubscribeButton } from "@/components/Buttons";
import Avatar from "@/components/Avatar/Avatar";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Feedback from "@/features/client-contact/components/Feedback/Feedback";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import ToggleSidebar from "@/layouts/components/Sidebar/ToggleSidebar";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useRouter } from "next/router";
import { MdFavorite } from "react-icons/md";

interface Props {
  children?: ReactNode;
  title?: string;
  hideScrolling: boolean;
  simplified?: boolean;
}

const PremiumNav: FC<Props> = ({
  children,
  title,
  hideScrolling,
  simplified,
}) => {
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

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
      } fixed left-0 top-0 z-[65] flex w-full select-none items-center justify-center`}
    >
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-2 bg-primary-color backdrop-blur-sm dark:border-slate-400/20 dark:shadow-cyan-100/10 xs:gap-4">
        <div className="text-md flex w-fit min-w-fit  cursor-pointer items-center justify-start font-semibold sm:text-2xl md:ml-20">
          <div className="px-2 md:hidden">{!isMobile && <ToggleSidebar />}</div>
          <Link href={AppRoutes.today}>
            <Logo hideText={isMobile} />
          </Link>
        </div>
        {title && (
          <span className="m-auto min-w-fit font-semibold capitalize sm:hidden">
            {title}
          </span>
        )}
        <div className="m-auto flex w-full">{children}</div>
        <div className="flex w-fit min-w-fit items-center justify-end gap-4 pr-4 text-xs sm:pr-8 sm:text-xl xl:pr-10">
          {(windowWidth > 1024 || !simplified) && (
            <>
              <Link href="/app/library/favorites">
                <span
                  className={`flex items-center justify-center text-sm outline-none duration-300 hover:opacity-100 `}
                >
                  <MdFavorite
                    className={`h-5 w-5 ${
                      router.pathname.includes("/app/library/favorites")
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                </span>
              </Link>
              <Feedback />
            </>
          )}
          {isMobile ? (
            <Link href={AppRoutes.nav_menu}>
              <Avatar height={30} width={30} />
            </Link>
          ) : (
            <AvatarDropDown isApp={true} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
