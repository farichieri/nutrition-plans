import { auth } from "@/services/firebase/firebase.config";
import { FC, useState } from "react";
import { persistor } from "@/store/store";
import { selectAuthSlice } from "@/features/authentication";
import { setIsSettingsOpen } from "@/store/slices/layoutSlice";
import { setProgress } from "@/features/progress";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Avatar from "@/components/Avatar/Avatar";
import DropDown from "../DropDown";
import Link from "next/link";
import SubscribeButton from "@/components/Buttons/Subscribe";
import ThemeSwitcher from "@/components/theme-switcher";

interface Props {
  isApp: boolean;
}

const AvatarDropDown: FC<Props> = ({ isApp }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [closeDrop, setCloseDrop] = useState(false);
  const { user } = useSelector(selectAuthSlice);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/").then(async () => {
      await signOut(auth)
        .then(() => {
          dispatch(setProgress({}));
          persistor.purge();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleOpenProfile = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setIsSettingsOpen(true));
    setCloseDrop(true);
  };

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={<Avatar changeable={false} width={30} height={30} />}
    >
      <div className="w-60 py-2">
        <div className="flex flex-col items-start justify-center px-4 py-2 opacity-60">
          <span className="opacity-100">{user?.display_name}</span>
          <span className="opacity-70">{user?.email_address}</span>
        </div>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>

        <div className="flex w-full gap-2 px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100">
          <ThemeSwitcher withText={true} />
        </div>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>

        <div className="flex" onClick={handleOpenProfile}>
          <button
            className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100  `}
          >
            <span>Settings</span>
            <span className="material-icons ml-auto">settings</span>
          </button>
        </div>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>
        <Link
          href={!isApp ? "/app" : "/"}
          className={`pointer-events-auto flex w-full items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100 `}
        >
          <span>{!isApp ? "My Plan" : "Homepage"}</span>
          <span className="material-icons ml-auto">open_in_new</span>
        </Link>
        <div className="flex hover:bg-slate-500/40">
          <button
            className={`flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:opacity-100 `}
            onClick={handleLogout}
          >
            <span>Logout</span>
            <span className="material-icons ml-auto">logout</span>
          </button>
        </div>
        <div className="mx-4 my-2 h-0 border-b border-slate-500/30 duration-300"></div>
        <div className="flex items-center justify-center px-4 py-2 ">
          <SubscribeButton />
        </div>
      </div>
    </DropDown>
  );
};

export default AvatarDropDown;
