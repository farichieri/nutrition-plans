import { auth } from "@/firebase/firebase.config";
import { setLogoutUser } from "@/store/slices/authSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import DropDown from "../DropDown";
import ThemeSwitcher from "@/components/theme-switcher";

const AvatarDropDown = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [closeDrop, setCloseDrop] = useState(false);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/").then(async () => {
      await signOut(auth)
        .then(() => {
          dispatch(setLogoutUser());
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleOpenProfile = (event: React.MouseEvent) => {
    event.preventDefault();
    setCloseDrop(true);
  };

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={<Avatar width={30} height={30} />}
    >
      <div className="flex border-b" onClick={handleOpenProfile}>
        <button
          className={`flex w-full cursor-pointer items-center border-none bg-transparent px-2 py-1 text-[var(--text-color)] hover:bg-[var(--box-shadow-light)]`}
        >
          Profile
        </button>
      </div>
      <div className="flex w-full gap-2 border-b px-2 py-1">
        <span>Theme</span>
        <ThemeSwitcher />
      </div>
      <div className="flex">
        <button
          className={`flex w-full cursor-pointer items-center border-none bg-transparent px-2 py-1 text-[var(--text-color)] hover:bg-[var(--box-shadow-light)]`}
          onClick={handleLogout}
        >
          Logout{" "}
        </button>
      </div>
    </DropDown>
  );
};

export default AvatarDropDown;
