import { InstagramIcon } from "@/assets";
import { TwitterIcon } from "@/assets";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();

  const RESOURCES_LINKS = [
    { name: "Plans", href: "/plans" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
  ];

  console.log({ router });

  const LEGAL_LINKS = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  return (
    <footer className="flex min-h-[12rem] w-full flex-col items-center justify-center border-t border-gray-300 dark:border-gray-400/10">
      <div className="m-auto flex w-full max-w-5xl flex-wrap-reverse justify-between gap-10 px-9 py-14 md:flex-nowrap ">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center md:items-start md:text-left">
          <span className=" flex text-2xl font-bold ">Nutrition Plans</span>
          <div className="flex flex-col text-left text-sm">
            <span className="opacity-50">© 2023 Nutrition Plans LLC.</span>
          </div>
          <div className="text-xs sm:text-sm">
            <span className="opacity-50">Need help? Email </span>
            <a
              className="duration-100 hover:text-green-500"
              href="mailto:hello@nutritionplans.co"
            >
              hello@nutritionplans.co
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              aria-label="Twitter"
              href="https://www.twitter.com/nutritionplans_"
              target="_blank"
              rel="noopener"
            >
              <TwitterIcon customClass="h-4 w-4 opacity-50 hover:opacity-100 duration-300" />
            </a>
            <div className="border-r"></div>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/nutritionplans_"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon customClass="h-4 w-4 opacity-50 hover:opacity-100 duration-300" />
            </a>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col gap-2">
            <span className="font-medium">Resources</span>
            <div className="flex flex-col gap-1 text-sm font-light">
              {RESOURCES_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.name}
                  className={`hover:opacity-100 ${
                    router.pathname === link.href ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium">Legal</span>
            <div className="flex flex-col gap-1 text-sm font-light">
              {LEGAL_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.name}
                  className={`hover:opacity-100 ${
                    router.pathname === link.href ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
