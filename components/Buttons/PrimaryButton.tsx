const PrimaryButton = ({
  content,
  onClick,
}: {
  content: string;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <button
      onClick={onClick}
      className="bold:border-green-800 group flex h-full w-fit items-center justify-center rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 py-1 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50"
    >
      <span className="shadow-black group-hover:drop-shadow-md">{content}</span>
    </button>
  );
};

export default PrimaryButton;
