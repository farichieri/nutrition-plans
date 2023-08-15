import { FC, ReactNode, useEffect, useState } from "react";
import { selectLayoutSlice } from "@/features/layout/slice";
import { useSelector } from "react-redux";

interface Props {
  children?: ReactNode;
  customClass?: string;
  title?: string;
  hideScrolling?: boolean;
}

const SubPremiumNav: FC<Props> = ({
  children,
  customClass,
  title,
  hideScrolling,
}) => {
  const { sidebarOpen } = useSelector(selectLayoutSlice);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 40) {
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
      className={
        ` ${
          !show && hideScrolling && "!top-0"
        } fixed right-0 z-[60] flex h-[var(--subnav-h)] w-full items-center gap-4 bg-primary-color-light px-1 backdrop-blur-lg transition-all duration-300 xs:px-2 s:px-3 sm:gap-10 sm:px-4 ` +
        customClass +
        ` ${sidebarOpen ? "md:pl-24 xl:pl-[17rem] " : "md:pl-24"} `
      }
    >
      {title && (
        <span className="m-auto min-w-fit font-semibold capitalize sm:ml-5 sm:text-xl">
          {title}
        </span>
      )}
      {children}
    </nav>
  );
};

export default SubPremiumNav;
