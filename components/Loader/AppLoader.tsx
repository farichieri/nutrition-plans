const AppLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
      <span className="ml-2 inline-block h-2 w-2 animate-flash rounded-full bg-gray-700 dark:bg-gray-200"></span>
      <span className="ml-2 inline-block h-2 w-2 animate-flash rounded-full bg-gray-700 [animation-delay:0.2s] dark:bg-gray-200"></span>
      <span className="ml-2 inline-block h-2 w-2 animate-flash rounded-full bg-gray-700 [animation-delay:0.4s] dark:bg-gray-200"></span>
    </div>
  );
};

export default AppLoader;
