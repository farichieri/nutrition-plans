import { AppRoutes } from "@/utils";
import { BackButton } from "@/components/Buttons";
import { FC } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdManageAccounts, MdPayment, MdSettingsCell } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {}

const SettingsNav: FC<Props> = ({}) => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  const isSettingsRoute = router.asPath === "/app/settings";

  const SETTINGS_PAGES = [
    {
      name: "Account",
      url: "/app/settings/account",
      paths: ["/app/settings/account", "/app/settings/"],
      icon: <MdManageAccounts className="h-6 w-6 text-green-500" />,
    },
    {
      name: "General",
      url: "/app/settings/general",
      paths: ["/app/settings/general"],
      icon: <MdSettingsCell className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Billing",
      url: "/app/settings/billing",
      paths: ["/app/settings/billing"],
      icon: <MdPayment className="h-6 w-6 text-green-500" />,
    },
  ];

  console.log({ router });

  return (
    <>
      {isMobile && isSettingsRoute ? (
        <nav className="fixed inset-0 z-[60] flex flex-col items-center bg-primary-color pt-[var(--nav-h)]">
          <BackButton
            route={AppRoutes.nav_menu}
            customClass="top-2 left-2 absolute"
          />
          <div className="flex w-full justify-center border-b py-8 text-2xl font-semibold">
            Settings
          </div>
          <div className="flex w-full max-w-[95vw] flex-col divide-y border-b">
            {SETTINGS_PAGES.map((page) => {
              return (
                <Link
                  href={page.url}
                  key={page.url}
                  className={`flex w-full items-center justify-start gap-4 px-2 py-5 text-xl font-medium capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 ${
                    page.paths.includes(router.asPath)
                      ? "opacity-100"
                      : "opacity-50"
                  }}`}
                >
                  {page.icon}
                  {page.name}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : (
        <nav className="flex h-full flex-col gap-1 ">
          <div className="hidden w-[10rem] flex-col lg:flex">
            {SETTINGS_PAGES.map((page) => {
              return (
                <Link
                  href={page.url}
                  key={page.url}
                  className={`flex w-full items-center justify-start gap-4 px-2 py-5 text-xl font-medium capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 ${
                    page.paths.includes(router.asPath)
                      ? "opacity-100"
                      : "opacity-50"
                  }}`}
                >
                  {page.icon}
                  {page.name}
                </Link>
              );
            })}
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
