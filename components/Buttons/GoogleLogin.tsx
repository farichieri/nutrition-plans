import { ReactNode } from "react";
import Image from "next/image";

const GoogleLoginButton = ({
  onClick,
  children,
}: {
  onClick: any;
  children: ReactNode;
}) => {
  return (
    <button onClick={onClick}>
      <span className="image">
        <Image
          alt="google-icon"
          src={"/images/icons/google.png"}
          width="26"
          height="26"
          style={{ pointerEvents: "none" }}
        />
      </span>
      <span className="text">{children}</span>
      <style jsx>
        {`
          button {
            display: flex;
            align-items: center;
            margin: auto;
            background: gray;
            border-radius: 3rem;
            justify-content: space-between;
            padding: 0;
            background: #4c8bf5;
            cursor: pointer;
            transition: 0.3s;
            border: none;
            box-shadow: 0 0 10px 1px var(--box-shadow-light);
          }
          .image {
            background: white;
            border-radius: 50%;
            padding: 0.5rem;
            display: flex;
          }
          .text {
            padding: 0 0.75rem 0 0.5rem;
            color: white;
          }
          button:hover {
            background: #386ac0;
          }
          button:active {
            box-shadow: 0 0 10px 1px var(--box-shadow);
          }
        `}
      </style>
    </button>
  );
};

export default GoogleLoginButton;
