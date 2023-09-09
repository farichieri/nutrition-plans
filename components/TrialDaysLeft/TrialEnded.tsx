import { FC } from "react";
import SubscribeModal from "../SubscribeModal/SubscribeModal";

interface Props {}

const TrialEnded: FC<Props> = () => {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9999999] flex h-screen w-screen flex-col items-center justify-center backdrop-blur-sm"></div>
      <div className="z-[99999999] flex flex-col items-center justify-center">
        <SubscribeModal isTrialOver={true} isCloseable={false} />
      </div>
    </>
  );
};

export default TrialEnded;
