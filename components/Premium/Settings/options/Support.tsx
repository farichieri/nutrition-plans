import Submit from "@/components/Buttons/SubmitButton";
import { postFeatureOrReport } from "@/firebase/helpers/Settings";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  BugAntIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/20/solid";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {}

const Support: FC<Props> = () => {
  const [action, setAction] = useState("feature");
  const [response, setResponse] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useSelector(selectAuthSlice);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user || !message) return;
    setIsLoading(true);
    setIsDisabled(true);
    const res = await postFeatureOrReport(user, action, message);
    console.log(res);
    if (!res?.error) {
      setMessage("");
      setResponse("Message sent successfully");
    } else {
      setResponse("Error sending message");
    }
    setIsLoading(false);
    setIsDisabled(false);
  };

  const handleChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLTextAreaElement).value;
    setMessage(value);
    setResponse("");
  };

  const handleAction = (opt: string) => {
    setAction(opt);
    setResponse("");
  };

  const OPTIONS = [
    {
      value: "feature",
      text: "Suggest a feature",
      icon: <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4" />,
    },
    {
      value: "bug",
      text: "Report a bug",
      icon: <BugAntIcon className="h-4 w-4" />,
    },
  ];

  useEffect(() => {
    if (message.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [message]);

  return (
    <div className="flex h-full w-full flex-col flex-wrap items-start justify-start gap-2">
      <div className="flex w-full flex-wrap gap-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAction(opt.value)}
            className={`${
              opt.value === action && "bg-slate-500/30"
            } flex items-center gap-1 rounded-xl px-2 py-1 text-xs sm:text-base`}
          >
            {opt.icon}
            <span>{opt.text}</span>
          </button>
        ))}
      </div>
      <form
        action=""
        className="flex w-full flex-col flex-wrap items-center justify-center gap-2"
      >
        <div className="flex w-full flex-col">
          <label htmlFor="">
            {action === "feature" ? (
              <span>
                Do you have an idea to improve the web? please let us know
              </span>
            ) : (
              <span>
                Have you seen a bug? Please report it and we will solve it
              </span>
            )}
            :
          </label>
          <textarea
            onChange={handleChange}
            value={message}
            className=" max-h-32 min-h-32 w-full resize-none rounded-lg border bg-transparent p-1"
          />
        </div>
        <Submit
          className={"text-xs sm:text-base"}
          onClick={handleSubmit}
          loadMessage={"Sending..."}
          content={action === "feature" ? "Send suggestion" : "Send report"}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
        {response && (
          <span className="font-semibold text-red-400">{response}</span>
        )}
      </form>
    </div>
  );
};

export default Support;
