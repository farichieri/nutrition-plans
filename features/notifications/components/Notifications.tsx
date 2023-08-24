import {
  selectNotificationsSlice,
  setArchiveNotification,
  setNotifications,
  setUnarchiveNotification,
} from "../slice";
import { archiveNotification, unarchiveNotification } from "../utils";
import { BsFillInboxFill } from "react-icons/bs";
import { FC, useEffect, useState } from "react";
import { fetchNotifications } from "../services";
import { MdOutlineNotifications } from "react-icons/md";
import { RoundButton } from "@/components/Buttons";
import { selectAuthSlice, setUpdateUser } from "@/features/authentication";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "@/components/DropDown/DropDown";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const Notifications: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [closeDrop, setCloseDrop] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("inbox");
  const notifications = useSelector(selectNotificationsSlice);
  const [idsLoading, setIdsLoading] = useState<string[]>([]);

  const TABS = [
    {
      title: "Inbox",
      icon: <MdOutlineNotifications />,
      id: "inbox",
    },
    {
      title: "Archived",
      icon: <MdOutlineNotifications />,
      id: "archived",
    },
  ];

  useEffect(() => {
    if (user) {
      const unsubscribe = async () => {
        const res = await fetchNotifications({ user });
        if (res.result === "success") {
          const data = res.data;
          const archivedIds = user.notificationsArchived;
          if (archivedIds) {
            dispatch(setNotifications({ notifications: data, archivedIds }));
          }
        }
      };
      unsubscribe();
    }
  }, []);

  const handleArchive = async (id: string) => {
    if (!user) return;
    if (idsLoading.length > 0) return;
    try {
      setIdsLoading([...idsLoading, id]);
      const isArchived = user.notificationsArchived?.includes(id);

      if (!isArchived) {
        const res = await archiveNotification({ notificationID: id, user });
        if (res.result === "error") {
          throw new Error("Error archiving notification");
        }
        dispatch(setArchiveNotification({ id }));
        dispatch(
          setUpdateUser({
            user,
            fields: {
              notificationsArchived: [...user.notificationsArchived, id],
            },
          })
        );
      } else {
        const res = await unarchiveNotification({ notificationID: id, user });
        if (res.result === "error") {
          throw new Error("Error unarchiving notification");
        }
        dispatch(setUnarchiveNotification({ id }));
        dispatch(
          setUpdateUser({
            user,
            fields: {
              notificationsArchived: user.notificationsArchived.filter(
                (item) => item !== id
              ),
            },
          })
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log({ error });
    } finally {
      setIdsLoading(idsLoading.filter((item) => item !== id));
    }
  };

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={
        <RoundButton customClass="p-1">
          {Object.values(notifications.inbox).length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-tight text-white">
              {Object.values(notifications.inbox).length}
            </span>
          )}
          <MdOutlineNotifications className="h-5 w-5  text-gray-500" />
        </RoundButton>
      }
    >
      <div className="w-64 s:w-80 sm:w-96">
        <div className="flex items-center justify-between border-b ">
          {TABS.map((tab) => (
            <button
              className={`flex w-1/2 cursor-pointer items-center justify-center border-b-2 py-2 ${
                activeTab === tab.id
                  ? "border-green-500 opacity-100"
                  : "border-transparent opacity-70"
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="ml-2">{tab.title}</span>
            </button>
          ))}
        </div>
        <div className="h-96 w-full">
          {!Object.values(notifications[activeTab as "inbox" | "archived"])
            .length ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="rounded-full bg-slate-500/10 p-3">
                <BsFillInboxFill className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-gray-500">No new notifications</span>
            </div>
          ) : (
            <div className="h-full w-full">
              {Object.values(
                notifications[activeTab as "inbox" | "archived"]
              ).map((item, index) => (
                <div
                  className="flex items-center justify-between gap-1 border-b px-2 py-2"
                  key={index}
                >
                  <div className="flex items-center">
                    <div className="rounded-full bg-slate-500/10 p-2">
                      <BsFillInboxFill className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="ml-2 flex flex-col">
                      <span className="text-sm font-semibold text-green-500">
                        {item.title}
                      </span>
                      <span className="text-xs">{item.body}</span>
                      {item.url && (
                        <span
                          className="cursor-pointer text-xs text-blue-500"
                          onClick={() =>
                            window.open(item.url, "_blank", "noreferrer")
                          }
                        >
                          View
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="flex items-center text-xs text-gray-500"
                      onClick={() => handleArchive(item.id)}
                    >
                      {user?.notificationsArchived?.includes(item.id)
                        ? "Unarchive"
                        : "Archive"}
                      {idsLoading.includes(item.id) && (
                        <Spinner customClass="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DropDown>
  );
};

export default Notifications;
