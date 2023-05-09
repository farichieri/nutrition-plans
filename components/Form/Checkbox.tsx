import { ChangeEventHandler, FC } from "react";

const fixedCheckboxClass = "cursor-pointer w-4 accent-green-500 ";

interface Props {
  customClass: string;
  handleChange: ChangeEventHandler;
  id: string;
  isRequired: boolean;
  labelFor: string;
  labelText: string;
  name: string;
  title: string;
  value: boolean;
}

const Checkbox: FC<Props> = ({
  customClass,
  handleChange,
  id,
  isRequired = false,
  labelFor,
  labelText,
  name,
  title,
  value,
}) => {
  return (
    <div className="focus:ring--500 relative my-2 flex h-[2rem] w-full appearance-none items-center justify-between rounded-md border border-gray-300 bg-slate-500/20 px-3 py-1 font-semibold text-gray-900  placeholder-gray-500 caret-green-500 focus:z-10 focus:border-green-500 focus:outline-none dark:border-gray-500  dark:bg-slate-500/20  dark:text-white sm:h-[2.5rem] sm:py-2 sm:text-sm">
      <label
        htmlFor={labelFor}
        className="not-sr-only w-full basis-1/2 capitalize"
      >
        {labelText.replaceAll("_", " ")}
      </label>
      <input
        className={fixedCheckboxClass + customClass}
        id={id}
        name={name}
        onChange={handleChange}
        required={isRequired}
        title={title}
        type="checkbox"
        checked={value}
      />
    </div>
  );
};

export default Checkbox;
