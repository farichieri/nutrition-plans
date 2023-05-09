import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { useSelector } from "react-redux";

const LoaderWithText = () => {
  const { loadingWithText } = useSelector(selectLayoutSlice);
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-center bg-white dark:bg-black/90">
      <div>
        <span className="ml-2 inline-block h-2 w-2 animate-flash rounded-full bg-gray-700 dark:bg-gray-200"></span>
        <span className="ml-2 inline-block h-2 w-2 animate-flash rounded-full bg-gray-700 [animation-delay:0.2s] dark:bg-gray-200"></span>
        <span className="ml-2 inline-block h-2 w-2 animate-flash rounded-full bg-gray-700 [animation-delay:0.4s] dark:bg-gray-200"></span>
      </div>
      <span className="w-full pl-3 text-center text-sm">Loading...</span>
    </div>
  );
};

export default LoaderWithText;
