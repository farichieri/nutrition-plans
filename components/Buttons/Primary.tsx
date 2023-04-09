import Link from "next/link";

const PrimaryButton = ({
  href,
  content,
}: {
  href: string;
  content: string;
}) => {
  return (
    <Link href={href}>
      <button className="bold:border-green-800 rounded-xl border border-green-400 bg-green-500/50 px-3 py-2 font-bold duration-300 hover:shadow-lg hover:shadow-green-400/20">
        {content}
      </button>
    </Link>
  );
};

export default PrimaryButton;
