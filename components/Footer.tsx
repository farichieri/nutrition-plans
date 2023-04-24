export default function Footer() {
  return (
    <footer className="flex min-h-60 w-full flex-col items-center justify-center border-t border-gray-300 dark:border-slate-400/30">
      <div className="flex h-full w-full flex-col  items-center justify-center gap-4 px-9 py-10 ">
        <span className="text-2xl font-bold ">Nutrition Plans</span>
        <div className="flex flex-col text-center text-sm">
          <span>© 2023 Nutrition Plans Inc.</span>
        </div>
      </div>
    </footer>
  );
}
