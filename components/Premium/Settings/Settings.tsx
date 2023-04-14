import { setIsSettingsOpen } from "@/store/slices/layoutSlice";
import { useDispatch } from "react-redux";
import About from "./options/About";
import General from "./options/General";
import Modal from "@/components/Modal/Modal";
import Profile from "./options/Profile";
import React, { FC, useState } from "react";
import Support from "./options/Support";
import Subscription from "./options/Subscription";
import { Cog8ToothIcon, UserIcon, WalletIcon } from "@heroicons/react/20/solid";

const settingOptions = [
  {
    icon: <UserIcon className="h-4 w-4" />,
    option: "profile",
    component: <Profile />,
  },
  {
    icon: <WalletIcon className="h-4 w-4" />,
    option: "subscription",
    component: <Subscription />,
  },
  {
    icon: <Cog8ToothIcon className="h-4 w-4" />,
    option: "general",
    component: <General />,
  },
  // {
  //   icon: <UserIcon className="h-4 w-4" />,
  //   option: "support",
  //   component: <Support />,
  // },
  // {
  //   icon: <UserIcon className="h-4 w-4" />,
  //   option: "about",
  //   component: <About />,
  // },
];

interface Props {}

const Settings: FC<Props> = () => {
  const dispatch = useDispatch();
  const [settingSelected, setSettingSelected] = useState("profile");

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const optionSelected = (event.target as HTMLButtonElement).value;
    setSettingSelected(optionSelected);
  };

  const getOptionSelected = () => {
    if (settingSelected) {
      return settingOptions.find((option) => option.option === settingSelected)
        ?.component;
    }
  };

  const handleClose = () => {
    dispatch(setIsSettingsOpen(false));
  };

  return (
    <Modal onClose={handleClose}>
      <section className="flex h-screen max-h-75vh w-full min-w-[50vw] max-w-4xl overflow-hidden">
        <div className="flex w-full basis-1/5 flex-col border-r text-center">
          <p className="border-b p-2 font-semibold md:text-2xl">Settings</p>
          <div className="flex flex-col p-2">
            {settingOptions.map((option, index) => (
              <button
                key={index}
                className={`${
                  settingSelected === option.option && "bg-slate-500/30"
                } flex w-full items-center gap-1 rounded-lg px-4 py-2 text-xs capitalize md:text-xl`}
                value={option.option}
                onClick={handleClick}
              >
                {option.icon}
                {option.option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full min-w-[100vw] basis-4/5 p-4">
          {getOptionSelected()}
        </div>
      </section>
    </Modal>
  );
};

export default Settings;
