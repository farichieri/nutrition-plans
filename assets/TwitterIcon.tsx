import { FC } from "react";

const fixedClass = "pointer-events-none";

interface Props {
  customClass?: string;
}

const TwitterIcon: FC<Props> = ({ customClass }) => {
  return (
    <svg
      className={fixedClass + customClass}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"></path>
    </svg>
  );
};

export default TwitterIcon;
