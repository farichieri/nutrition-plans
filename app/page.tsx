import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col">
      <div className="flex h-[97vh] w-full flex-col items-center gap-10 px-4 py-24">
        <div className="flex flex-col items-center justify-center gap-10 text-4xl">
          <h1 className="text-5xl font-semibold">
            The best nutrition plans on the internet
          </h1>
          <span>Choose the plan that fits your requirements</span>
          <span>Receive a daily nutrition plan every week</span>
        </div>
        <Link href="/subscribe">
          <button className="flex items-center justify-center rounded-lg border border-cyan-400 bg-cyan-950 px-2 py-1 text-xl shadow-md shadow-cyan-100/20">
            Start a plan
          </button>
        </Link>
      </div>

      <div className="p-24 text-center text-3xl">
        <span>You can do it!</span>
      </div>
    </section>
  );
}
