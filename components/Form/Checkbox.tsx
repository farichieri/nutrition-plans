import { FC, forwardRef } from "react";

const fixedCheckboxClass = "cursor-pointer w-4 accent-green-500 ";

interface Props {
  customClass?: string;
  error?: string;
  id: string;
  labelText: string;
  pattern?: string;
  placeholder?: string;
  title: string;
  name?: string;
  readOnly?: boolean;
  register?: any;
}

const Checkbox: FC<Props> = forwardRef<HTMLInputElement, Props>(
  (
    {
      customClass,
      id,
      error,
      labelText,
      pattern,
      placeholder,
      title,
      readOnly,
      name,
      register,
      ...props
    },
    ref
  ) => {
    return (
      <div className="focus:ring--500 relative flex h-[2rem] w-full appearance-none items-center justify-between rounded-md border border-gray-300 bg-slate-500/20 px-3 py-1 font-semibold text-gray-900  placeholder-gray-500 caret-green-500 focus:z-10 focus:border-green-500 focus:outline-none dark:border-gray-500  dark:bg-slate-500/20  dark:text-white sm:h-[2.5rem] sm:py-2 sm:text-sm">
        <label htmlFor={id} className="not-sr-only w-full basis-1/2 capitalize">
          {labelText.replaceAll("_", " ")}
        </label>
        <input
          className={fixedCheckboxClass + customClass}
          id={id}
          name={name}
          title={title}
          type="checkbox"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
