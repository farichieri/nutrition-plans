import { ChangeEventHandler, FC } from "react";

const fixedInputClass =
  "rounded-md capitalize font-semibold appearance-none dark:bg-slate-500/90 dark:text-white bg-slate-500/20 relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500  focus:outline-none  focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm";

interface Props {
  customClass: string;
  handleChange: ChangeEventHandler;
  id: string;
  isRequired: boolean;
  labelFor: string;
  labelText: string;
  name: string;
  placeholder: string;
  title: string;
  value: string;
  options: string[];
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
}) => {
  return (
    <div className="my-3 flex items-center justify-between gap-2 ">
      <label htmlFor={labelFor} className="not-sr-only basis-2/4 capitalize">
        {labelText.replaceAll("_", " ")}
      </label>
      <select
        placeholder={placeholder}
        title={title}
        defaultValue={value || "none"}
        name={name}
        id={id}
        required={isRequired}
        className={fixedInputClass + customClass}
        onChange={handleChange}
      >
        <option value="none" disabled hidden>
          Select
        </option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className="capitalize dark:bg-slate-500"
          >
            {opt.replaceAll("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
