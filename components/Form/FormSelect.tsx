import { Options } from "@/types";
import { ChangeEventHandler, FC, forwardRef } from "react";

const fixedInputClass =
  " capitalize rounded-md min-w-fit h-[2rem] sm:h-[2.5rem] dark:border-gray-500 w-full font-semibold dark:bg-slate-500/20 dark:text-white bg-slate-500/20 relative block px-2 sm:py-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500  focus:outline-none  focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm ";

const readOnlyClass =
  " outline-none bg-transparent cursor-default select-none appearance-none ";

export type Props = {
  customClass?: string;
  error?: string;
  handleChange: ChangeEventHandler;
  id: string;
  labelText?: string;
  name?: string;
  options: Options;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  register?: any;
  title: string;
  isRequired?: boolean;
  value?: string;
};

const FormSelect: FC<Props> = forwardRef<HTMLSelectElement, Props>(
  (
    {
      customClass = "",
      error,
      handleChange,
      id,
      labelText,
      name,
      options,
      pattern,
      placeholder,
      readOnly,
      register,
      title,
      value,
      isRequired,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className=" flex flex-wrap items-center gap-0 sm:flex-nowrap">
          {labelText && (
            <label
              className="not-sr-only w-full min-w-fit capitalize "
              htmlFor={id}
            >
              {labelText.replaceAll("_", " ")}
            </label>
          )}
          <select
            onChange={handleChange}
            className={
              !readOnly ? fixedInputClass : readOnlyClass + customClass
            }
            defaultValue={value}
            disabled={readOnly}
            id={id}
            name={name}
            placeholder={placeholder}
            ref={ref}
            required={isRequired}
            title={title}
            {...props}
          >
            <option value="" disabled hidden>
              Select
            </option>
            {options.map((opt) => (
              <option
                className={` capitalize dark:bg-slate-500`}
                key={opt.value}
                value={opt.value}
              >
                {opt.text.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="text-red-500">
            <span className="text-red-500">{error}</span>
          </div>
        )}
      </>
    );
  }
);

FormSelect.displayName = "FormSelect";
export default FormSelect;
