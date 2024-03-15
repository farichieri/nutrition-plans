import Footer from "../components/Footer/Footer";
import NavBar from "./components/Nav/Nav";

export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="flex h-full min-h-screen w-full flex-col items-center bg-primary px-4 ">
        {children}
      </div>
      <Footer />
    </>
  );
}
