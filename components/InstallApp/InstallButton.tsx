import { BeforeInstallPromptEvent } from "@/types";
import { FC } from "react";
import { setBeforeInstallState } from "@/store/slices/layoutSlice";
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
      if (outcome === "accepted") {
        dispatch(setBeforeInstallState(false));
      }
    }
  };

  if (!deferredPrompt) return <></>;

  return (
    <button
      onClick={handlePrompt}
      className="rounded-3xl border border-green-500 bg-green-500 px-3 py-1.5 text-white"
    >
      <span>Install App</span>
    </button>
  );
};

export default InstallButton;
