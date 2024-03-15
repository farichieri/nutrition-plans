import { FC, forwardRef } from "react";

const fixedInputClass =
  " rounded-md h-[2rem] sm:h-[2.5rem] w-full dark:border-gray-500  font-semibold appearance-none dark:bg-slate-500/20 dark:text-white bg-slate-500/20 relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500  focus:outline-none  focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm ";

const readOnlyClass =
  " outline-none bg-transparent cursor-default select-none appearance-none ";

const numClass =
  " rounded-md w-32 truncate h-[2rem] sm:h-[2.5rem] dark:border-gray-500 font-semibold appearance-none dark:bg-slate-500/20 dark:text-white bg-slate-500/20 relative block w-20 px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500 focus:outline-none focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm ";

export type Props = {
  customClass?: string;
  error?: string;
  id: string;
  labelText?: string;
  pattern?: string;
  placeholder?: string;
  title: string;
  name?: string;
  type: string;
  readOnly?: boolean;
  register?: any;
};

const FormInput: FC<Props> = forwardRef<HTMLInputElement, Props>(
  (
    {
      customClass = "",
      id,
      error,
      labelText,
      pattern,
      placeholder,
      name,
      title,
      type,
      readOnly,
      register,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className="flex flex-wrap items-center gap-1 sm:flex-nowrap ">
          {labelText && (
            <label
              htmlFor={id}
              className={`w-full min-w-fit capitalize ` + customClass}
            >
              {labelText.replaceAll("_", " ")}
            </label>
          )}
          {
            <input
              className={
                !readOnly
                  ? type === "number"
                    ? numClass
                    : fixedInputClass
                  : readOnlyClass + customClass
              }
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              disabled={readOnly}
              id={id}
              min={0}
              name={name}
              pattern={pattern}
              placeholder={placeholder}
              ref={ref}
              title={title}
              type={type}
              {...props}
            />
          }
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
FormInput.displayName = "FormInput";
export default FormInput;
