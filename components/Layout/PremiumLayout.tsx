import { selectLayoutSlice, setSidebarOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import PremiumNav from "../Nav/PremiumNav";
import Sidebar from "../Sidebar/PremiumSidebar";
import { selectAuthSlice } from "@/store/slices/authSlice";
import Login from "../Auth/Login";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(selectLayoutSlice);
  const { theme } = useSelector(selectLayoutSlice);
  const { user } = useSelector(selectAuthSlice);

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {theme && user ? (
        <div className="relative flex w-screen flex-col ">
          <PremiumNav sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <Sidebar sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <div
            className={`flex flex-col pt-[var(--nav-h)] duration-300 ${
              sidebarOpen && "sm:pl-[13rem]"
            }`}
          >
            {children}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
