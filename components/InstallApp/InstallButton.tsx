import { setBeforeInstallState } from "@/features/authentication";
import { BeforeInstallPromptEvent } from "@/types";
import { FC } from "react";
import { useDispatch } from "react-redux";

interface Props {
  deferredPrompt: BeforeInstallPromptEvent;
}

const InstallButton: FC<Props> = ({ deferredPrompt }) => {
  const dispatch = useDispatch();

  const handlePrompt = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome, platform } = await deferredPrompt.userChoice;
      console.log({ platform });
      if (outcome === "accepted") {
        dispatch(setBeforeInstallState(false));
      }
    }
  };

  if (!deferredPrompt) return <></>;

  return (
    <button
      onClick={handlePrompt}
      className="rounded-md border border-green-500 bg-green-500/50 px-3 py-1.5 text-white hover:bg-green-500"
    >
      <span>Install App</span>
    </button>
  );
};

export default InstallButton;
