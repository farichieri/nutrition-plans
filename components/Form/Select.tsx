import { Options } from "@/types";
import { ChangeEventHandler, FC } from "react";

const fixedInputClass =
  " rounded-md my-1 min-w-fit h-[2rem] sm:h-[2.5rem] dark:border-gray-500 w-full font-semibold dark:bg-slate-500/20 dark:text-white bg-slate-500/20 relative block px-2 sm:py-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500  focus:outline-none  focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm ";

const readOnlyClass =
  " outline-none bg-transparent cursor-default select-none appearance-none ";

interface Props {
  customClass: string;
  handleChange: ChangeEventHandler;
  id: string;
  isRequired: boolean;
  labelFor: string;
  labelText: string;
  name: string;
  placeholder?: string;
  title: string;
  value: string | number | null;
  options: Options;
  readOnly?: boolean;
}

const Select: FC<Props> = ({
  customClass,
  handleChange,
  id,
  isRequired = false,
  labelFor,
  labelText,
  name,
  placeholder,
  title,
  value,
  options,
  readOnly,
}) => {
  return (
    <div className=" flex flex-wrap items-center gap-2 sm:flex-nowrap">
      {labelText && (
        <label
          htmlFor={labelFor}
          className="not-sr-only w-full min-w-fit capitalize "
        >
          {labelText.replaceAll("_", " ")}
        </label>
      )}
      <select
        placeholder={placeholder}
        title={title}
        name={name}
        id={id}
        required={isRequired}
        className={!readOnly ? fixedInputClass : readOnlyClass + customClass}
        onChange={handleChange}
        value={value ? value : "none"}
        disabled={readOnly}
      >
        <option value="none" disabled hidden>
          Select
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className={` dark:bg-slate-500`}
          >
            {opt.text.replaceAll("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
