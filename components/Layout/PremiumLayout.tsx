import { selectLayoutSlice, setSidebarOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import PremiumNav from "../Nav/PremiumNav";
import Sidebar from "../Sidebar/PremiumSidebar";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectLayoutSlice);
  const { sidebarOpen } = useSelector(selectLayoutSlice);

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {theme && (
        <div className="relative flex w-screen flex-col ">
          <PremiumNav
            theme={theme}
            sidebarOpen={sidebarOpen}
            handleSidebar={handleSidebar}
          />
          <Sidebar sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <div
            className={`flex flex-col pt-[var(--nav-h)] duration-300 ${
              sidebarOpen && "sm:pl-[12rem]"
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
