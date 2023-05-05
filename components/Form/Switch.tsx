import { ChangeEventHandler, FC, useState } from "react";

const fixedCheckboxClass = "cursor-pointer h-4 w-4 accent-green-500 ";

interface Props {
  customClass: string;
  handleChange: ChangeEventHandler;
  id: string;
  labelFor: string;
  labelText: string;
  name: string;
  title: string;
  value: boolean;
}

const Switch: FC<Props> = ({
  customClass,
  handleChange,
  id,
  labelFor,
  labelText,
  name,
  title,
  value,
}) => {
  return (
    <div className="focus:ring--500 relative my-2 flex w-full appearance-none items-center justify-between rounded-md border border-gray-300 bg-slate-500/20 px-3 py-2 font-semibold text-gray-900 placeholder-gray-500 caret-green-500 focus:z-10  focus:border-green-500  focus:outline-none dark:bg-slate-500/50 dark:text-white sm:text-sm">
      <label
        htmlFor={labelFor}
        className="not-sr-only w-full basis-1/2 capitalize"
      >
        {labelText.replaceAll("_", " ")}
      </label>
      {/* <inputut
        className={fixedCheckboxClass + customClass}
        id={id}
        name={name}
        onChange={handleChange}
        title={title}
        type="checkbox"
        value={value}
      /> */}
      <div className="flex w-full max-w-xl">
        <div className="flex w-full justify-center">
          <div className="relative flex h-5 w-12 cursor-pointer rounded-3xl border-green-500 text-xs shadow-[0_0_5px_gray] sm:text-base">
            <div
              className={`${
                value === true
                  ? "right-[0%] bg-green-500"
                  : "right-[50%] bg-gray-500"
              } absolute h-full w-[50%] select-none rounded-3xl  transition-all duration-300`}
            ></div>
            <input
              type="checkbox"
              name="measurement_unit"
              onChange={handleChange}
              className="z-20 w-28 rounded-3xl border-none px-4 py-1 text-xs font-semibold active:shadow-lg sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Switch;
