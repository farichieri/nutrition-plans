import Spinner from "./Spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen select-none flex-col items-center justify-center gap-2 bg-white dark:bg-black">
      <span className="flex w-fit min-w-fit justify-start text-3xl font-bold">
        Nutrition Plans
      </span>
      <Spinner customClass="h-10 w-10" />
      {/* <div>
        <span className="ml-2 inline-block h-3 w-3 animate-flash rounded-full bg-gray-700 dark:bg-gray-200"></span>
        <span className="ml-2 inline-block h-3 w-3 animate-flash rounded-full bg-gray-700 [animation-delay:0.2s] dark:bg-gray-200"></span>
        <span className="ml-2 inline-block h-3 w-3 animate-flash rounded-full bg-gray-700 [animation-delay:0.4s] dark:bg-gray-200"></span>
      </div> */}
    </div>
  );
};

export default Loader;
