import Link from "next/link";
import { useRouter } from "next/router";

const EvolutionNav = () => {
  const router = useRouter();
  const thisPage = router.asPath;

  const pages = [
    { name: "progress", link: "/app/evolution/progress" },
    { name: "profile", link: "/app/evolution/profile" },
  ];

  return (
    <div className=" fixed left-0 top-[var(--nav-h)] z-[70] flex h-[var(--nav-h)] w-full items-center justify-center gap-4 bg-white/100 px-4 shadow-md backdrop-blur-sm dark:border-cyan-100/20 dark:bg-black/100 dark:shadow-cyan-100/10 ">
      {pages.map((page) => (
        <Link
          key={page.name}
          href={page.link}
          className={`rounded-3xl px-3 py-1 capitalize text-white ${
            thisPage === page.link ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
};

export default EvolutionNav;
