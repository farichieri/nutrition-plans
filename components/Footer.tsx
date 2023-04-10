export default function Footer() {
  return (
    <footer className="min-h-24 flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 border-t border-gray-300 px-9 py-10 dark:border-cyan-100/20">
        <span className="text-2xl font-bold ">Nutrition Plans</span>
        <div className="flex flex-col text-center text-sm">
          <span>Copyright © 2023, Nutrition Plans, Inc.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
