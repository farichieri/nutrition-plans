import { ChangeEventHandler, FC } from "react";

const fixedInputClass =
  "rounded-md appearance-none basis-2/4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

interface Props {
  customClass: string;
  handleChange: ChangeEventHandler;
  id: string;
  isRequired: boolean;
  labelFor: string;
  labelText: string;
  max: string;
  min: string;
  name: string;
  pattern: string | undefined;
  placeholder: string;
  step: string;
  title: string;
  type: string;
  value: string;
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
}) => {
  return (
    <div className="my-3 flex items-center justify-between gap-2 ">
      <label htmlFor={labelFor} className="not-sr-only basis-2/4">
        {labelText}
      </label>
      <input
        className={fixedInputClass + customClass}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={handleChange}
        pattern={pattern}
        placeholder={placeholder}
        required={isRequired}
        step={step}
        title={title}
        type={type}
        value={value || ""}
      />
    </div>
  );
};

export default Input;
