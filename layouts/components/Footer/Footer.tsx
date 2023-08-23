import { InstagramIcon } from "@/assets";
import { TwitterIcon } from "@/assets";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Footer() {
  return (
    <footer className="flex min-h-[12rem] w-full flex-col items-center justify-center border-t border-gray-300 dark:border-gray-400/10">
      <div className="flex h-full w-full flex-col  items-center justify-center gap-4 px-9 py-14 ">
        <span className=" flex text-2xl font-bold ">Nutrition Plans</span>
        <div className="flex flex-col text-center text-sm">
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
        <div>
          <ThemeSwitcher withText={false} />
        </div>
      </div>
    </footer>
  );
}
