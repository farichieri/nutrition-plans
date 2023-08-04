import { ChangeEventHandler, FC } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface Props {
  handleChange: ChangeEventHandler;
  value: string;
  placeholder?: string;
  readOnly: boolean;
  customClass?: string;
  name: string;
  isRequired: boolean;
}

const TextArea: FC<Props> = ({
  handleChange,
  value,
  placeholder,
  readOnly,
  customClass,
  name,
  isRequired,
}) => {
  return (
    <ReactTextareaAutosize
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
      className={`text-md w-full resize-none overflow-hidden bg-transparent p-2 ${customClass}`}
      required={isRequired}
    />
  );
};

export default TextArea;
