import React, { FC } from "react";
import Spinner from "../Loader/Spinner";

interface Props {}

const ConnectionError: FC<Props> = () => {
  return (
    <div className="fixed inset-0 left-1/2 z-100 flex h-screen w-screen -translate-x-1/2 flex-col items-center justify-center bg-black/60">
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-white p-4 dark:bg-black">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Network Error...</span>
          <Spinner customClass="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ConnectionError;
