import { postFeedback } from "@/firebase/helpers/Settings";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import FormAction from "../Form/FormAction";
import SubmitButton from "../Buttons/SubmitButton";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Props {}

const Feedback: FC<Props> = () => {
  const [feedbackOpen, setfeedbackOpen] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const [message, setMessage] = useState("");
  const [resSuccess, setResSuccess] = useState("");
  const [resError, setResError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFeedback = () => {
    setfeedbackOpen(!feedbackOpen);
    setMessage("");
    setResError("");
    setResSuccess("");
  };

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const value = (event.target as HTMLTextAreaElement).value;
    setMessage(value);
    setResError("");
  };

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!message) setResError("Your feedback can't be empty");
    if (!user || !message) return;
    setIsLoading(true);
    setIsDisabled(true);
    const res = await postFeedback(user, message);
    if (!res?.error) {
      setMessage("");
      setResSuccess("Your feedback has been received!");
    } else {
      setResError("Error sending message");
    }
    setIsLoading(false);
    setIsDisabled(false);
  };

  return (
    <div className="">
      <button
        onClick={handleFeedback}
        className={`flex items-center text-sm outline-none duration-300 hover:opacity-100 ${
          feedbackOpen ? "opacity-100" : "opacity-50"
        }`}
      >
        Feedback
      </button>
      {feedbackOpen && (
        <>
          <div className="absolute right-0 top-[var(--nav-h)] z-[100] -mt-1 flex h-48 w-full max-w-xs flex-col rounded-md border bg-white dark:bg-black sm:right-5">
            {resSuccess ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
                <CheckCircleIcon className="h-7 w-7 fill-green-500" />
                <span className="text-sm ">{resSuccess}</span>
                <span className="text-sm ">Thank you for your help.</span>
              </div>
            ) : (
              <>
                <div className="flex h-full flex-col p-2">
                  <textarea
                    autoCorrect="off"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    onChange={handleChange}
                    value={message}
                    placeholder="Your feedback..."
                    className="h-full w-full resize-none rounded-lg border bg-transparent p-2 text-sm outline-none duration-300 placeholder:opacity-50 focus-within:border-black dark:focus-within:border-white"
                  />
                  {resError && (
                    <span className="m-auto p-1 pt-2 text-sm text-red-500">
                      {resError}
                    </span>
                  )}
                </div>
                <div className="mt-auto flex w-full items-center justify-between border-t p-2">
                  <span className="text-sm">Help us improve!</span>
                  <SubmitButton
                    className={""}
                    onClick={handleSubmit}
                    loadMessage={""}
                    content="Send"
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                  />
                </div>
              </>
            )}
          </div>

          <div
            onClick={handleFeedback}
            className="absolute inset-0 h-screen w-screen bg-transparent"
          ></div>
        </>
      )}
    </div>
  );
};

export default Feedback;
