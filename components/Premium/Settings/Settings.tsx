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

interface Props {}

const Settings: FC<Props> = () => {
  const dispatch = useDispatch();
  const [settingSelected, setSettingSelected] = useState("profile");

  const settingOptions = [
    {
      icon: <UserIcon className="h-4 w-4" />,
      option: "profile",
      component: <Profile setSettingSelected={setSettingSelected} />,
    },
    {
      icon: <WalletIcon className="h-4 w-4" />,
      option: "subscription",
      component: <Subscription setSettingSelected={setSettingSelected} />,
    },
    {
      icon: <Cog8ToothIcon className="h-4 w-4" />,
      option: "general",
      component: <General setSettingSelected={setSettingSelected} />,
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
      <section className="flex h-screen max-h-75vh w-[56rem] min-w-full max-w-[95vw] overflow-hidden">
        <div className="flex w-auto basis-1/5 flex-col border-r text-center">
          <p className="border-b p-2 font-semibold md:text-2xl">Settings</p>
          <div className="flex flex-col p-1 md:p-2">
            {settingOptions.map((option, index) => (
              <button
                key={index}
                className={`${
                  settingSelected === option.option && "bg-slate-500/30"
                } flex w-full items-center gap-1 rounded-lg px-1 py-2 text-xs capitalize sm:px-2 md:text-base`}
                value={option.option}
                onClick={() => setSettingSelected(option.option)}
              >
                {option.icon}
                {option.option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex basis-4/5 p-4">{getOptionSelected()}</div>
      </section>
    </Modal>
  );
};

export default Settings;
