import { setIsSettingsOpen } from "@/store/slices/layoutSlice";
import { useDispatch } from "react-redux";
import Account from "./options/Account";
import General from "./options/General";
import Modal from "@/components/Modal/Modal";
import React, { FC, useState } from "react";
import Subscription from "./options/Subscription";
import { MdAccountCircle, MdLoyalty, MdSettings } from "react-icons/md";

interface Props {}

const Settings: FC<Props> = () => {
  const dispatch = useDispatch();
  const [settingSelected, setSettingSelected] = useState("account");

  const settingOptions = [
    {
      icon: <MdAccountCircle className=" h-6 w-6" />,
      option: "account",
      component: <Account setSettingSelected={setSettingSelected} />,
    },
    {
      icon: <MdLoyalty className=" h-6 w-6" />,
      option: "subscription",
      component: <Subscription setSettingSelected={setSettingSelected} />,
    },
    {
      icon: <MdSettings className=" h-6 w-6" />,
      option: "general",
      component: <General setSettingSelected={setSettingSelected} />,
    },
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
      <section className="flex h-screen max-h-[85vh] max-w-[95vw] overflow-hidden sm:min-w-[640px]">
        <div className="flex w-auto basis-1/5 flex-col border-r text-center">
          <p className="border-b p-2 font-semibold md:text-2xl">Settings</p>
          <div className="flex flex-col p-1 md:p-2">
            {settingOptions.map((option, index) => (
              <button
                key={index}
                className={`${
                  settingSelected === option.option && "bg-slate-500/30"
                } flex w-full flex-col items-center gap-1 rounded-lg px-1 py-2 text-xs capitalize sm:flex-row sm:px-2 md:text-base`}
                value={option.option}
                onClick={() => setSettingSelected(option.option)}
              >
                {option.icon}
                {option.option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex basis-4/5 flex-col ">
          <span className="p-3 text-lg font-semibold capitalize">
            {settingSelected}
          </span>
          {getOptionSelected()}
        </div>
      </section>
    </Modal>
  );
};

export default Settings;
