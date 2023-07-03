import { auth } from "@/services/firebase/firebase.config";
import { MdClose, MdOpenInNew, MdPerson, MdSettings } from "react-icons/md";
import { persistor } from "@/store/store";
import { selectAuthSlice } from "@/features/authentication";
import { signOut } from "firebase/auth";
import { SubscribeButton } from "@/components/Buttons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";
import Avatar from "@/components/Avatar/Avatar";

export default function Page() {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);

  const handleClose = () => {
    router.back();
  };

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/").then(async () => {
      await signOut(auth)
        .then(() => {
          persistor.purge();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <section className="flex">
      <MdClose
        className="absolute left-2 top-2 h-5 w-5"
        onClick={handleClose}
      />
      <div className="flex w-screen flex-col py-12">
        <div className="flex items-center justify-between px-4 ">
          <div className="flex flex-col items-start justify-center  opacity-60">
            <span className="opacity-100">{user?.display_name}</span>
            <span className="opacity-70">{user?.email_address}</span>
          </div>
          <Avatar width={50} height={50} />
        </div>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>
        <Link
          href={"/app/profile"}
          className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100  `}
        >
          <span>Profile</span>
          <MdPerson className="ml-auto h-6 w-6" />
        </Link>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>

        <div className="flex w-full gap-2 px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100">
          <ThemeSwitcher withText={true} />
        </div>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>
        <Link
          href={"/app/settings"}
          className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100  `}
        >
          <span>Settings</span>
          <MdSettings className="ml-auto h-6 w-6" />
        </Link>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>

        <span
          onClick={() => window.open("/", "_blank", "noreferrer")}
          className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100  `}
        >
          <span>Homepage</span>
          <MdOpenInNew className="ml-auto h-6 w-6" />
        </span>

        <div className="flex hover:bg-slate-500/40">
          <button
            className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:opacity-100 `}
            onClick={handleLogout}
          >
            <span>Log Out</span>
          </button>
        </div>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>
        <div className="flex items-center justify-center px-4 py-2 ">
          <SubscribeButton />
        </div>
      </div>
    </section>
  );
}
