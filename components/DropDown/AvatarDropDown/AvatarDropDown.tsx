import { ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";
import { auth } from "@/firebase/firebase.config";
import { persistor } from "@/store/store";
import { setIsSettingsOpen } from "@/store/slices/layoutSlice";
import { setProgress } from "@/store/slices/progressSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import DropDown from "../DropDown";
import ThemeSwitcher from "@/components/theme-switcher";
import Feedback from "@/components/Premium/Feedback";

const AvatarDropDown = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [closeDrop, setCloseDrop] = useState(false);

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
      <div
        className="flex border-b border-slate-500/30 hover:bg-slate-500/40 dark:border-slate-500"
        onClick={handleOpenProfile}
      >
        <button
          className={`flex w-full cursor-pointer items-center gap-1 border-none bg-transparent px-2 py-1  `}
        >
          <UserIcon className="h-4 w-4" />
          Account
        </button>
      </div>
      <div className="flex w-full gap-2 border-b border-slate-500/30 px-2 py-1 hover:bg-slate-500/40 dark:border-slate-500">
        <ThemeSwitcher isPremium={true} />
      </div>
      <div className="flex hover:bg-slate-500/40">
        <button
          className={`flex w-full cursor-pointer items-center gap-1 border-none bg-transparent px-2 py-1 `}
          onClick={handleLogout}
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Logout
        </button>
      </div>
    </DropDown>
  );
};

export default AvatarDropDown;
