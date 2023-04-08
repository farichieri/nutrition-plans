import { cookies } from "next/headers";
import { Theme } from "types/types";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

export default function NavBar() {
  const theme =
    cookies().get("theme")?.value === "dark" ? Theme.dark : Theme.light;

  return (
    <nav className="fixed top-0 flex h-[var(--nav-h)] w-full items-center justify-around p-4 shadow-md backdrop-blur-sm dark:shadow-cyan-100/20">
      <div className="flex w-48 text-xl font-semibold">
        <Link href={"/"}>Nutrition Plans</Link>
      </div>
      <div className=" flex items-center justify-center gap-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/blog"}>Blog</Link>
      </div>
      <div className="flex w-48 gap-4 ">
        <ThemeSwitcher theme={theme} />
        <Link href="/subscribe">
          <button className="flex items-center justify-center rounded-lg border border-cyan-400 bg-cyan-300/40 px-2 py-1 text-xl shadow-md shadow-cyan-100/20 dark:bg-cyan-950">
            Start a plan
          </button>
        </Link>
      </div>
    </nav>
  );
}
