import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  customClass?: string;
}

const Fixed: FC<Props> = ({ children, customClass }) => {
  return (
    <div className={`fixed z-100 bg-primary-color ${customClass}`}>
      {children}
    </div>
  );
};

export default Fixed;
