import { ChangeEventHandler, FC, forwardRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const fixedInputClass =
  " rounded-md p-2 dark:border-gray-500 w-full font-semibold dark:bg-slate-500/20 dark:text-white bg-slate-500/20 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500 focus:outline-none focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm ";

interface Props {
  customClass?: string;
  error?: string;
  handleChange: ChangeEventHandler;
  isRequired: boolean;
  name: string;
  placeholder?: string;
  readOnly: boolean;
  value: string;
  labelText?: string;
  id?: string;
}

const TextArea: FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      handleChange,
      value,
      placeholder,
      readOnly,
      customClass,
      name,
      isRequired,
      error,
      labelText,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col items-center">
        {labelText && (
          <label
            className="not-sr-only mr-1 w-full min-w-fit capitalize"
            htmlFor={name}
          >
            {labelText.replaceAll("_", " ")}
          </label>
        )}
        <ReactTextareaAutosize
          id={id}
          minRows={1}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          name={name}
          spellCheck={false}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`text-md w-full resize-none overflow-hidden bg-transparent ${customClass} ${fixedInputClass}`}
          required={isRequired}
          ref={ref}
          {...props}
        />
        {error && (
          <div className="text-red-500">
            <span className="text-red-500">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
