import Logo from "@/components/Logo/Logo";
import { selectLayoutSlice, setSidebarOpen } from "@/features/layout/slice";
import { selectPlansSlice } from "@/features/plans/slice";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollapsedPages from "./Pages/CollapsedPages";
import MobilePages from "./Pages/MobilePages";
import WebPages from "./Pages/WebPages";
import ToggleSidebar from "./ToggleSidebar";

interface Props {
  hideScrolling?: boolean;
}

const PremiumSidebar: FC<Props> = ({ hideScrolling }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const { sidebarOpen } = useSelector(selectLayoutSlice);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isEditingDiet } = useSelector(selectPlansSlice);

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  useEffect(() => {
    let used = false;
    if (!used) {
      if (sidebarOpen && window.innerWidth < 768) {
        console.log("dispatched");
        dispatch(setSidebarOpen(false));
      }
    }
    return () => {
      used = true;
    };
  }, [router.asPath, dispatch, sidebarOpen]);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 40) {
        setShow(false);
      } else {
        setShow(true);
      }
      // Detect bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY, controlNavbar]);

  return (
    <>
      {isMobile ? (
        <div
          className={`${
            ((!show && hideScrolling) || isEditingDiet) &&
            "!-bottom-[--mobile-sidenav-h] "
          } fixed bottom-0 z-[150] flex h-[var(--mobile-sidenav-h)] w-full items-center border-t border-[#46464623] bg-primary transition-all duration-300 dark:border-[#7c7c7c1a]`}
        >
          <MobilePages />
        </div>
      ) : (
        <>
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-[70] bg-black/30 md:hidden"
              onClick={handleSidebar}
            ></div>
          )}
          <div
            className={`${
              !sidebarOpen ? "md:left-0" : "left-[-5rem]"
            } fixed left-0 top-0 z-[70] hidden h-screen min-h-screen w-20 select-none flex-col gap-2 overflow-auto bg-primary px-2 pb-5 backdrop-blur-sm transition-all duration-0 dark:border-slate-400/20 sm:gap-4 md:flex`}
          >
            <div className="flex w-full items-center justify-center py-1">
              <ToggleSidebar />
            </div>
            <CollapsedPages />
          </div>
          <div
            onClick={handleSidebar}
            className={`fixed inset-0 z-[70] bg-black/50 xl:hidden  ${
              sidebarOpen ? "flex" : "hidden"
            }
            `}
          ></div>
          <div
            className={`${
              sidebarOpen ? "left-0" : "left-[-16rem]"
            } fixed left-0 top-0 z-[70] flex h-screen min-h-screen w-56 select-none flex-col gap-1 overflow-auto bg-primary px-2 pb-5 font-semibold backdrop-blur-sm transition-all duration-300 dark:border-slate-400/20 sm:gap-2 md:w-56 md:duration-300 xl:duration-0`}
          >
            <div className="flex w-full items-center py-1 pl-1">
              <div className="hidden md:flex">
                <ToggleSidebar />
              </div>
              <span className="py-1 pl-3 text-lg font-semibold">
                <Logo hideText={true} showPremiumText />
              </span>
            </div>
            <WebPages />
          </div>
        </>
      )}
    </>
  );
};

export default PremiumSidebar;
