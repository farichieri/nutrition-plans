import { FC, useEffect, useState } from "react";
import AvatarDropDown from "@/components/DropDown/AvatarDropDown/AvatarDropDown";
import Feedback from "@/features/client-contact/components/Feedback/Feedback";
import ToggleSidebar from "@/layouts/components/Sidebar/ToggleSidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectLayoutSlice, setSidebarOpen } from "@/store/slices/layoutSlice";

interface Props {}

const PremiumNav: FC<Props> = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(selectLayoutSlice);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
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
        <div className="text-md flex w-fit min-w-fit basis-1/3 cursor-pointer items-center justify-start font-semibold sm:text-2xl">
          <div className="px-2 md:hidden">
            <ToggleSidebar />
          </div>
          <span onClick={handleSidebar} className=" flex"></span>
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
