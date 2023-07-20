import { FC, useEffect } from "react";
import { selectLayoutSlice, setSidebarOpen } from "@/features/layout/slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import CollapsedPages from "./Pages/CollapsedPages";
import Logo from "@/components/Logo/Logo";
import ToggleSidebar from "./ToggleSidebar";
import WebPages from "./Pages/WebPages";
import useWindowWidth from "@/hooks/useWindowWidth";
import MobilePages from "./Pages/MobilePages";

interface Props {}

const PremiumSidebar: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sidebarOpen } = useSelector(selectLayoutSlice);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 768) {
      dispatch(setSidebarOpen(false));
    }
  }, [router.asPath]);

  return (
    <>
      {isMobile ? (
        <div className="fixed bottom-0 z-[150] flex w-full items-center bg-black/90">
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
            } fixed left-0 z-[70] hidden h-screen min-h-screen w-20 select-none flex-col gap-2 overflow-auto bg-primary-color px-2 pb-5 backdrop-blur-sm transition-all duration-0 dark:border-slate-400/20 sm:gap-4 md:flex`}
          >
            <div className="flex w-full items-center justify-center py-1">
              <ToggleSidebar />
            </div>
            <CollapsedPages />
          </div>

          <div
            className={`${
              sidebarOpen ? "left-0" : "left-[-16rem]"
            } fixed left-0 z-[70] flex h-screen min-h-screen w-64 select-none flex-col gap-1 overflow-auto bg-primary-color px-2 pb-5 font-semibold backdrop-blur-sm transition-all duration-300 dark:border-slate-400/20 sm:gap-2 md:w-64 md:duration-0`}
          >
            <div className="flex w-full items-center py-1 pl-1">
              <div className="hidden md:flex">
                <ToggleSidebar />
              </div>
              <span className="py-1 pl-3 text-lg font-semibold">
                <Logo hideText={false} />
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
