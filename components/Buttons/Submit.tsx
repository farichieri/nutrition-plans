import { MouseEventHandler } from "react";

const Submit = ({
  content,
  isLoading,
  isDisabled,
  loadMessage,
  onClick,
  style,
}: {
  onClick: MouseEventHandler;
  content: string;
  isLoading: boolean;
  isDisabled: boolean;
  loadMessage: string;
  style: any;
}) => {
  return (
    <button style={style} onClick={onClick} disabled={isDisabled}>
      {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
      <style jsx>{`
        button {
          cursor: pointer;
          border-radius: 9999px;
          transition: 0.3s;
          width: 100%;
          background: var(--background-start-rgb);
          border: 1px solid lightgray;
          position: relative;
          min-height: 25px;
          max-width: 125px;
          color: var(--foreground-rgb);
          height: 2rem;
        }
        .button-background {
        }

        button:hover {
        }
        button:active {
          box-shadow: 0 0 20px 1px var(--box-shadow);
        }
        button:disabled {
          color: var(--box-shadow-light);
          box-shadow: none;
          background: var(--bg-color);
          border: 1px solid var(--box-shadow-light);
          cursor: initial;
        }
        button:disabled:hover {
          filter: none;
        }
      `}</style>
    </button>
  );
};

export default Submit;
