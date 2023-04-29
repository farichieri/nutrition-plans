import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="w-fit rounded-full p-2 duration-300 hover:bg-slate-500/20"
    >
      <ArrowSmallLeftIcon className="h-6 w-6" />
    </button>
  );
};

export default BackButton;
