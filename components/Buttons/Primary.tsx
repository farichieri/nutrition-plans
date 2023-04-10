import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const PrimaryButton = ({
  href,
  content,
}: {
  href: string;
  content: string;
}) => {
  return (
    <Link
      href={href}
      className="bold:border-green-800 group flex h-full items-center justify-center rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50"
    >
      <span className="shadow-black group-hover:drop-shadow-md">{content}</span>
    </Link>
  );
};

export default PrimaryButton;
