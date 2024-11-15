import { FC } from "react";
import Spinner from "./Spinner";

interface Props {
  text: string;
}

const TranspLoader: FC<Props> = ({ text }) => {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen select-none flex-col items-center justify-center gap-2 bg-black/80">
      <span className="flex w-fit min-w-fit justify-start text-3xl font-medium text-white">
        {text}
      </span>
      <Spinner customClass="h-10 w-10 stroke-white " />
    </div>
  );
};

export default TranspLoader;
