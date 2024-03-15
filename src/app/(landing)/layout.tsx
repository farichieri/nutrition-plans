import { Footer, Nav } from "@/components";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="flex z-10 h-full min-h-screen w-full flex-col items-center pt-[var(--nav-h)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
