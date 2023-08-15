import { ChangeEventHandler, FC } from "react";

const fixedInputClass =
  "rounded-md h-[2rem] sm:h-[2rem] w-full dark:border-gray-500  font-semibold appearance-none dark:bg-slate-500/20 dark:text-white bg-slate-500/20 relative block px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500  focus:outline-none  focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm";

const readOnlyClass =
  " outline-none bg-transparent cursor-default select-none appearance-none ";

interface Props {
  customClass?: string;
  handleChange: ChangeEventHandler;
  id: string;
  isRequired: boolean;
  labelFor: string;
  labelText?: string;
  max?: string;
  min?: string;
  name: string;
  pattern?: string;
  placeholder?: string;
  step?: string;
  title: string;
  type: string;
  value: string;
  readOnly?: boolean;
}

const Input: FC<Props> = ({
  customClass,
  handleChange,
  id,
  isRequired = false,
  labelFor,
  labelText,
  max,
  min,
  name,
  pattern,
  placeholder,
  step,
  title,
  type,
  value,
  readOnly,
}) => {
  return (
    <div className="my-1 flex flex-wrap items-center gap-1 sm:flex-nowrap ">
      {labelText && (
        <label htmlFor={labelFor} className="not-sr-only w-full">
          {labelText}
        </label>
      )}
      <input
        className={!readOnly ? fixedInputClass : readOnlyClass + customClass}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={handleChange}
        pattern={pattern}
        placeholder={!readOnly ? placeholder : ""}
        required={isRequired}
        step={step}
        title={title}
        type={type}
        disabled={readOnly}
        value={value || ""}
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
      />
    </div>
  );
};

export default Input;
