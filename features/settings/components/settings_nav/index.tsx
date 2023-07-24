import { AppRoutes } from "@/utils";
import { BackButton } from "@/components/Buttons";
import { FC } from "react";
import { MdManageAccounts, MdPayment, MdSettingsCell } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {}

const SettingsNav: FC<Props> = ({}) => {
  const router = useRouter();

  const SETTINGS_PAGES = [
    {
      name: "Account",
      url: "/app/settings/account",
      pathname: ["/app/settings/account", "/app/settings/"],
      icon: <MdManageAccounts className="h-6 w-6 text-green-500" />,
    },
    {
      name: "General",
      url: "/app/settings/general",
      pathname: ["/app/settings/general"],
      icon: <MdSettingsCell className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Billing",
      url: "/app/settings/billing",
      pathname: ["/app/settings/billing"],
      icon: <MdPayment className="h-6 w-6 text-green-500" />,
    },
  ];

  return (
    <nav className="z-[60] m-auto flex w-full flex-col items-center bg-primary-color pb-10">
      <BackButton
        route={AppRoutes.nav_menu}
        customClass="top-2 left-2 lg:absolute hidden"
      />
      <div className="fle w-full max-w-[95vw] flex-col divide-y">
        {SETTINGS_PAGES.map((page) => {
          return (
            <div className="min-w-fit">
              <Link
                href={page.url}
                key={page.url}
                className={`my-1 flex w-full items-center justify-start gap-4 rounded-xl px-2 py-3 text-xl font-medium capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 ${
                  page.pathname?.includes(router.pathname)
                    ? "bg-slate-500/20"
                    : ""
                } `}
              >
                {page.icon}
                {page.name}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default SettingsNav;
