"use client";

import { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillInboxFill } from "react-icons/bs";
import { MdOutlineNotifications } from "react-icons/md";
import { useSelector } from "react-redux";

import { RoundButton } from "@/components/Buttons";
import DropDown from "@/components/DropDown/DropDown";
import Spinner from "@/components/Loader/Spinner";
import { selectAuthSlice } from "@/features/authentication";
import { formatToShortDate } from "@/utils";

import {
  useArchiveAllNotificationsMutation,
  useArchiveNotificationMutation,
  useGetNotificationsQuery,
  useUnarchiveNotificationMutation,
} from "../services";
import { selectNotificationsSlice } from "../slice";

interface Props {}

const Notifications: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const [closeDrop, setCloseDrop] = useState(false);
  const [activeTab, setActiveTab] = useState<"inbox" | "archived">("inbox");
  const [idsLoading, setIdsLoading] = useState<string[]>([]);
  const notifications = useSelector(selectNotificationsSlice);

  if (!user) return <></>;

  useGetNotificationsQuery({ user });
  const [archiveNotification] = useArchiveNotificationMutation();
  const [unarchiveNotification] = useUnarchiveNotificationMutation();
  const [archiveAllNotifications] = useArchiveAllNotificationsMutation();

  const TABS: { title: string; icon: any; id: "inbox" | "archived" }[] = [
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

  const handleArchive = useCallback(
    async (id: string) => {
      if (!user) return;
      if (idsLoading.length > 0) return;
      try {
        setIdsLoading([...idsLoading, id]);
        const isArchived = user.notificationsArchived?.includes(id);

        if (!isArchived) {
          const res = await archiveNotification({
            notificationID: id,
            user,
          });
          if ("error" in res) throw new Error("Error archiving notification");
          toast.success("Notification archived");
        } else {
          const res = await unarchiveNotification({
            notificationID: id,
            user,
          });
          if ("error" in res) throw new Error("Error unarchiving notification");
          toast.success("Notification unarchived");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      } finally {
        setIdsLoading(idsLoading.filter((item) => item !== id));
      }
    },
    [idsLoading, user]
  );

  const handleArchiveAll = async () => {
    if (!user) return;
    if (idsLoading.length > 0) return;
    try {
      setIdsLoading([...idsLoading, "all"]);
      const notificationIDS = Object.values(
        notifications[activeTab as "inbox" | "archived"]
      ).map((item) => item.id);
      const res = await archiveAllNotifications({
        user,
        notificationIDS: notificationIDS,
      });
      if ("error" in res) throw new Error("Error archiving notifications");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIdsLoading(idsLoading.filter((item) => item !== "all"));
    }
  };

  return (
    <DropDown
      customClass={"right-[-40px]"}
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={
        <RoundButton customClass="p-1">
          {Object.values(notifications.inbox).length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-tight text-white">
              {Object.values(notifications.inbox).length}
            </span>
          )}
          <MdOutlineNotifications className="h-6 w-6  text-gray-500" />
        </RoundButton>
      }
    >
      <div
        className={`w-72 overflow-hidden s:w-80 sm:w-96 ${
          activeTab === "inbox" && "pb-8 "
        }`}
      >
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
        <div className="relative h-96 w-full overflow-y-auto">
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
              ).map((item, index) => {
                const dateCreated = formatToShortDate(item.dateCreated);
                return (
                  <div
                    className="flex items-center justify-between gap-3 border-b px-3 py-2"
                    key={index}
                  >
                    <div className="flex w-1/12 items-center justify-center">
                      <span className="rounded-full bg-slate-500/10 p-3">
                        <BsFillInboxFill className="h-4 w-4 text-gray-500" />
                      </span>
                    </div>
                    <div className="flex w-9/12 items-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-semibold text-green-500">
                          {item.title}
                        </span>
                        <span className="text-sm">{item.body}</span>
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
                        <span className="mt-1 text-[10px] opacity-50">
                          {dateCreated}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-2/12 items-center justify-center">
                      <button
                        className="flex items-center text-[11px] text-gray-500"
                        onClick={() => handleArchive(item.id)}
                      >
                        {idsLoading.includes(item.id) ? (
                          <Spinner customClass="ml-1 h-4 w-4" />
                        ) : user?.notificationsArchived?.includes(item.id) ? (
                          "Unarchive"
                        ) : (
                          "Archive"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {activeTab === "inbox" &&
          Object.values(notifications.inbox).length > 0 && (
            <div className="absolute bottom-0 flex h-8 w-full items-center justify-center border-t bg-tertiary">
              <button
                className="text-xs text-gray-500"
                onClick={handleArchiveAll}
              >
                {idsLoading.includes("all") ? (
                  <Spinner customClass="ml-1 h-4 w-4" />
                ) : (
                  "Archive all"
                )}
              </button>
            </div>
          )}
      </div>
    </DropDown>
  );
};

export default Notifications;
