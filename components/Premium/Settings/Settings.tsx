import General from "./options/General";
import Profile from "./options/Profile";
import React, { FC, useState } from "react";
import Support from "./options/Support";
import About from "./options/About";

const settingOptions = [
  {
    option: "profile",
    component: <Profile />,
  },

  {
    option: "general",
    component: <General />,
  },

  {
    option: "support",
    component: <Support />,
  },
  {
    option: "about",
    component: <About />,
  },
];

interface Props {}

const Settings: FC<Props> = () => {
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

  return (
    <div className="">
      <div className="flex flex-col">
        <p className="title">Settings</p>
        {settingOptions.map((option, index) => (
          <button
            key={index}
            className={`${settingSelected === option.option && "selected"}`}
            value={option.option}
            onClick={handleClick}
          >
            {option.option}
          </button>
        ))}
      </div>
      <div className="content">{getOptionSelected()}</div>
    </div>
  );
};

export default Settings;
