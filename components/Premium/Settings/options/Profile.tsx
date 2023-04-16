import Avatar from "@/components/Avatar/Avatar";
import SubscribeButton from "@/components/Buttons/Subscribe";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { FC } from "react";
import { useSelector } from "react-redux";

interface Props {
  setSettingSelected: Function;
}

const Profile: FC<Props> = ({ setSettingSelected }) => {
  const { user } = useSelector(selectAuthSlice);

  return (
    <div className="flex h-full w-full flex-col items-start gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-semibold">Photo</span>
        <Avatar width={80} height={80} changeable={true} />
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-1 ">
          <span>Name</span>
          <input
            className="cursor-default text-ellipsis rounded-md border bg-transparent px-1 py-0.5 outline-none "
            type="text"
            value={String(user?.display_name)}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Email</span>
          <input
            className="cursor-default text-ellipsis rounded-md border bg-transparent px-1 py-0.5 outline-none"
            type="text"
            value={String(user?.email_address)}
            readOnly
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2">
        <span>Current plan: {user?.premium_plan}</span>
        <button
          className="rounded-md bg-slate-400/30 p-1 shadow-md"
          onClick={() => setSettingSelected("subscription")}
        >
          Manage Subscription
        </button>
      </div>
      {/* <div className="b mt-auto flex w-full justify-center gap-4">
        <button className="w-20 rounded-md bg-green-500 p-1">Discard</button>
        <button className="w-20 rounded-md bg-green-500 p-1">Save</button>
      </div> */}
    </div>
  );
};

export default Profile;
