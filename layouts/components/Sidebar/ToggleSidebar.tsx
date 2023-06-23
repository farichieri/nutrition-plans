import { Bars3Icon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { RoundButton } from "@/components/Buttons";
import { selectLayoutSlice, setSidebarOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";

interface Props {}

const ToggleSidebar: FC<Props> = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(selectLayoutSlice);

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  return (
    <div className="flex w-14 items-center justify-center ">
      <RoundButton customClass="h-10 w-10" onClick={handleSidebar}>
        {!sidebarOpen ? (
          <Bars3Icon className="h-7 w-7" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </RoundButton>
    </div>
  );
};

export default ToggleSidebar;
