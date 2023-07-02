import { FC, ReactNode, useEffect, useState } from "react";
import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { useSelector } from "react-redux";

interface Props {
  children?: ReactNode;
  customClass?: string;
  title?: string;
}

const SubPremiumNav: FC<Props> = ({ children, customClass, title }) => {
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
        `active ${
          !show && "hidden"
        } fixed right-0 z-[60] flex min-h-[var(--subnav-h)] w-full items-center gap-4 bg-primary-color px-1 backdrop-blur-lg xs:px-2 s:px-3 sm:gap-10 sm:px-4 ` +
        customClass +
        ` ${sidebarOpen ? "lg:pl-[17rem] " : "lg:pl-24"} `
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
