import { FC } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { PAGES } from "@/features/settings";
import { useRouter } from "next/router";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {}

const SettingsNav: FC<Props> = ({}) => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;
  const isSettingsRoute = router.asPath === "/app/settings";

  return (
    <>
      {isMobile && isSettingsRoute ? (
        <nav className="fixed inset-0 z-[60] flex flex-col items-center bg-primary-color pt-[var(--nav-h)]">
          <div className="flex w-full justify-center border-b py-8 text-2xl font-semibold">
            Personal Settings Account
          </div>
          <div className="flex w-full max-w-[95vw] flex-col divide-y border-b">
            {PAGES.map((page) => (
              <Link
                href={page.path}
                key={page.path}
                className={`flex w-full items-center justify-start px-2 py-5 text-xl font-medium capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 ${
                  router.asPath === page.path ? "opacity-100" : "opacity-50"
                }`}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </nav>
      ) : (
        <nav className="flex h-full flex-col gap-1 ">
          <div className="hidden w-[15rem] flex-col sm:flex">
            {PAGES.map((page) => (
              <Link
                href={page.path}
                key={page.path}
                className={`flex items-center justify-center rounded-md px-2 py-2 capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 ${
                  page.match.includes(router.asPath)
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
                {page.name}
              </Link>
            ))}
          </div>
          <Link
            href={"/app/settings"}
            className="flex items-center gap-2 border-b px-4 py-5 sm:hidden"
          >
            <MdArrowBackIosNew className="h-4 w-4" />
            <span>Account Settings</span>
          </Link>
        </nav>
      )}
    </>
  );
};

export default SettingsNav;
