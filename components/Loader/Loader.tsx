import Spinner from "./Spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen select-none flex-col items-center justify-center gap-2 bg-white dark:bg-black">
      <Spinner customClass="h-10 w-10" />
    </div>
  );
};

export default Loader;
