import { Footer, Nav } from "@/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="flex h-full min-h-screen w-full flex-col items-center bg-primary px-4 ">
        {children}
      </div>
      <Footer />
    </>
  );
}
