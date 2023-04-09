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
      className="bold:border-green-800 text-shad rounded-3xl border border-green-500 bg-green-500/80 px-3 py-2 font-semibold duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-800/50 dark:hover:shadow-green-400/50"
    >
      {content}
    </Link>
  );
};

export default PrimaryButton;
